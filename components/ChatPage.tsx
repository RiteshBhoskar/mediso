"use client"

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Send } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useSession } from "next-auth/react";

interface Message {
 sender: string;
 content: string;
 time?: string;
}

export default function ChatPage() {
 const searchParams = useSearchParams();
 const appointmentId = searchParams.get('appointmentId');
 const [messages, setMessages] = useState<Message[]>([]);
 const [messageInput, setMessageInput] = useState<string>("");
 const [ws, setWs] = useState<WebSocket | null>(null);
 const [doctorName, setDoctorName] = useState<string | null>("");
 const [loadingDoctorName, setLoadingDoctorName] = useState<boolean>(true);

 const { data: session , status } = useSession();
 const userType = session?.user.role;

 useEffect(() => {
  if (!appointmentId) {
   toast.error("Appointment ID is missing.");
   setLoadingDoctorName(false);
   return;
  }

  const fetchDoctorName = async () => {
   setLoadingDoctorName(true);
   try {
    const response = await fetch(`/api/appointments/${appointmentId}`);
    if (!response.ok) {
     throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    setDoctorName(data.doctorName);
   } catch (error: any) {
    toast.error("Failed to load doctor's name.");
    console.error("Error fetching doctor's name:", error);
   } finally {
    setLoadingDoctorName(false);
   }
  };

  fetchDoctorName();
 }, [appointmentId]);


 useEffect(() => {
  if (!appointmentId) return;

  const socket = new WebSocket("ws://localhost:8080");

  socket.onopen = () => {
   console.log("WebSocket connection opened");
   socket.send(JSON.stringify({ type: "join", payload: { appointmentId } }));
  };

  socket.onmessage = (event) => {
   const receivedMessage = JSON.parse(event.data);
   if (receivedMessage.type === "chat") {
    setMessages((prev) => [...prev, { ...receivedMessage.payload, time: new Date().toLocaleTimeString() }]); // Include time here
   }
  };

  socket.onclose = () => {
   console.log("WebSocket connection closed");
  };

  socket.onerror = (error) => {
   console.error("WebSocket error:", error);
  };

  setWs(socket);
  return () => {
   if (socket.readyState === WebSocket.OPEN) {
    socket.close();
   }
  };
 }, [appointmentId]);

 const sendMessage = () => {
  if (!messageInput.trim() || !ws || !appointmentId) return;
  const newMessage: Message = { sender: userType, content: messageInput, time: new Date().toLocaleTimeString() };
  setMessages((prev) => [...prev, newMessage]);
  ws.send(JSON.stringify({ type: "chat", payload: { appointmentId, message: messageInput, sender: userType } })); // Include sender
  setMessageInput("");
 };


 if (loadingDoctorName) {
  return <LoadingSpinner />;
 }

 return (
  <div className="flex h-screen">
   <div className="w-1/3 border-r border-gray-200 hidden md:block"> {/* Hide conversation list on smaller screens */}
    <div className="p-4">
     </div>
    <ScrollArea className="h-full">
     {/* You can remove or replace the hardcoded conversations list */}
     {/* Conversations list is hidden for now */}
     no recent conversations
    </ScrollArea>
   </div>
   <div className="w-full md:w-2/3 flex flex-col">
   <div className="border-b p-4">
    <h2 className="text-lg font-semibold">{doctorName ? `Chat with Dr. ${doctorName}` : "Loading Doctor's Name..."}</h2>
   </div>
   <div className="flex flex-col h-screen">
   <ScrollArea className="flex-1 p-4">
    {messages.map((msg, index) => (
     <div key={index} className={`flex ${msg.sender === userType ? "justify-end" : "justify-start"} mb-4`}>
      <Card className={`max-w-[70%] ${msg.sender === userType ? "bg-blue-500 text-white" : "bg-gray-100"}`}>
       <CardContent className="p-3">
        <p>{msg.content}</p>
        {msg.time && <p className="text-xs text-gray-400 mt-1">{msg.time}</p>}
       </CardContent>
      </Card>
     </div>
    ))}
   </ScrollArea>
   <div className="p-4 flex items-center space-x-2 bg-white border-t">
    <Input className="flex-1" placeholder="Type a message..." value={messageInput} onChange={(e) => setMessageInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' ? sendMessage() : null} />
    <Button size="icon" onClick={sendMessage}><Send className="h-5 w-5" /></Button>
   </div>
   </div>
   </div>
  </div>
 );
}