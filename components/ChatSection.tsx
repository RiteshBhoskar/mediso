"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Send } from "lucide-react";
import { toast } from "sonner";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useSession } from "next-auth/react";

interface Message {
    sender: string;
    content: string;
    time?: string;
    isRead?: boolean;
}

interface ChatSectionProps {
    appointmentId: string | null;
}

const ChatSection: React.FC<ChatSectionProps> = ({ appointmentId }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [messageInput, setMessageInput] = useState<string>("");
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [doctorName, setDoctorName] = useState<string>("");
    const [patientName, setPatientName] = useState<string>("");
    const [loadingDoctorName, setLoadingDoctorName] = useState<boolean>(true);
    const { data: session , status } = useSession();
    const userType = session?.user.role;

    useEffect(() => {
        if (!appointmentId) {
            setLoadingDoctorName(false); 
            return;
        }

        const fetchDoctorAndPatientNames = async () => {
            setLoadingDoctorName(true);
            try {
                const response = await fetch(`/api/appointments/${appointmentId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setDoctorName(data.doctorName);
                setPatientName(data.patientName);
            } catch (error: any) {
                toast.error("Failed to load names.");
                console.error("Error fetching names:", error);
            } finally {
                setLoadingDoctorName(false);
            }
        };

        fetchDoctorAndPatientNames();
    }, [appointmentId]);

    useEffect(() => {
        if (!appointmentId) return;
        if (status !== "authenticated" || !userType) {
            return;
        }

        const socket = new WebSocket("ws://localhost:8080");

        socket.onopen = () => {
            console.log("WebSocket connection opened for appointment:", appointmentId);
            toast.success("Connected to chat.");
            socket.send(JSON.stringify({ type: "join", payload: { appointmentId, senderType: userType } }));
        };

        socket.onmessage = (event) => {
            try {
                const receivedMessage = JSON.parse(event.data.toString());
                if (receivedMessage.type === "chat") {
                    setMessages((prev) => [...prev, {
                        content: receivedMessage.payload.message as string,
                        sender: receivedMessage.payload.sender as string,
                        time: new Date().toLocaleTimeString()
                    }]);
                }
            } catch (error) {
                console.error("Error parsing message data:", error);
            }
        };
        socket.onclose = () => {
            console.log("WebSocket connection closed for appointment:", appointmentId);
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
    }, [appointmentId, userType, status]);


    const sendMessage = () => {
        if (!messageInput.trim() || !ws || !appointmentId) return;
        const newMessage: Message = { sender: userType, content: messageInput, time: new Date().toLocaleTimeString() };
        setMessages((prev) => [...prev, newMessage]);
        ws?.send(JSON.stringify({ type: "chat", payload: { appointmentId, message: messageInput, sender: userType } }));
        setMessageInput("");
    };

    if (loadingDoctorName) {
        return <div className="flex justify-center items-center pl-96">
            <LoadingSpinner />
        </div>
    }

    return (
        <div className="w-2/3 flex flex-col">
            <div className="border-b p-4 flex">
                <Avatar className="h-12 w-12">
                    <AvatarImage
                        src={`/placeholder.svg?height=48&width=48&text=${doctorName.charAt(0)}`}
                        alt={doctorName}
                    />
                    <AvatarFallback>{doctorName.charAt(0)}</AvatarFallback>
                </Avatar>
                {session?.user.role === "DOCTOR" ? (
                    <h2 className="text-lg pl-3 font-semibold flex justify-center items-center ">{patientName ? patientName : "Loading Patient's Name..."}</h2>
                ) : (
                    <h2 className="text-lg pl-3 font-semibold flex justify-center items-center ">{doctorName ? `Dr. ${doctorName}` : "Loading Doctor's Name..."}</h2>
                )}
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
    );
};

export default ChatSection;