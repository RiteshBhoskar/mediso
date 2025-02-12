"use client";

import React, { useEffect, useRef, useState } from "react";
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
    createdAt: string;
}

interface ChatSectionProps {
    appointmentId: string | null | undefined;
}

const ChatSection: React.FC<ChatSectionProps> = ({ appointmentId }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [messageInput, setMessageInput] = useState<string>("");
    const wsRef = useRef<WebSocket | null>(null);
    const [doctorName, setDoctorName] = useState<string>("");
    const [patientName, setPatientName] = useState<string>("");
    const [loadingDoctorName, setLoadingDoctorName] = useState<boolean>(false);
    const [loadingMessages, setLoadingMessages] = useState<boolean>(false);
    const [concernTitle , setConcernTitle] = useState<string>("");
    const { data: session , status } = useSession();
    const userType = session?.user.role;

    const markMessagesAsRead = async () => {
        if (!appointmentId) return;
        try {
            const response = await fetch("/api/messages/markAsRead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ appointmentId }),
            });

            if (!response.ok) {
                toast.error(`HTTP error! status: ${response.status}`);
            } else {
                console.log("Messages marked as read.");
            }

        } catch (error) {
            console.error("Error marking messages as read:", error);
        }
    }

    useEffect(() => {
        if (!appointmentId) {
            setLoadingDoctorName(false);
            setLoadingMessages(false); 
            setMessages([]);
            setDoctorName("");
            setPatientName("");
            setConcernTitle("");
            return;
        }

        if(appointmentId){

        const fetchInitialData = async () => {
            setLoadingMessages(true);
            setLoadingDoctorName(true);
            try {
                const namesResponse = await fetch(`/api/appointments/${appointmentId}`);
                if (!namesResponse.ok) {
                    throw new Error(`HTTP error! status: ${namesResponse.status}`);
                }
                const namesData = await namesResponse.json();
                setDoctorName(namesData.doctorName);
                setPatientName(namesData.patientName);
                setConcernTitle(namesData.concernTitle);
                const historyResponse = await fetch(`/api/messages/history?appointmentId=${appointmentId}`);
                if (!historyResponse.ok) {
                    throw new Error(`HTTP error! status: ${historyResponse.status}`);
                }

                const historyData = await historyResponse.json();   
                if (historyData.messages) {
                    setMessages(historyData.messages.sort((a: { createdAt: string | number | Date; }, b: { createdAt: string | number | Date; }) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()));
                } else {
                    setMessages([]);
                }

                await markMessagesAsRead();
            } catch (error: any) {
                toast.error("Failed to load names and messages history.");
                console.error("Error fetching names:", error);
            } finally {
                setLoadingDoctorName(false);
                setLoadingMessages(false);
            }
        };
        fetchInitialData();
    }
    }, [appointmentId]);

    useEffect(() => {
        if (!appointmentId) return;
        if (status !== "authenticated" || !userType) {
            return;
        }

        wsRef.current = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL as string);

        wsRef.current.onopen = () => {
            console.log("WebSocket connection opened for appointment:", appointmentId);
            wsRef.current?.send(JSON.stringify({ type: "join", payload: { appointmentId, senderType: userType } }));
        };

        wsRef.current.onmessage = (event) => {
            try {
                const receivedMessage = JSON.parse(event.data.toString());
                if (receivedMessage.type === "chat") {
                     const newMessage: Message = {
                        content: receivedMessage.payload.message as string,
                        sender: receivedMessage.payload.sender as string,
                        time: new Date().toLocaleTimeString(),
                        createdAt: new Date().toISOString(),
                    }
                    setMessages((prev) => [...prev, newMessage]);
                }
            } catch (error) {
                console.error("Error parsing message data:", error);
            }
        };
        wsRef.current.onclose = () => {
            console.log("WebSocket connection closed for appointment:", appointmentId);
        };
        wsRef.current.onerror = (error) => {
            console.error("WebSocket error:", error);
            toast.error("Failed to establish WebSocket connection.");
        };


        return () => {
            if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
                wsRef.current.close();
            }
        };
    }, [appointmentId, userType, status]);

    const sendMessage = () => {
        if (!messageInput.trim() || !wsRef.current || !appointmentId) return;
        const newMessage: Message = { sender: userType, content: messageInput, time: new Date().toLocaleTimeString() , createdAt: new Date().toISOString() };
        setMessages((prev) => [...prev, newMessage]);
        wsRef.current.send(JSON.stringify({ type: "chat", payload: { appointmentId, message: messageInput, sender: userType } }));
        setMessageInput("");
    };

    if (loadingDoctorName) {
        return <div className="flex justify-center items-center w-full h-full">
            <LoadingSpinner />
        </div>
    }

    return (
        <div className="w-2/3 flex flex-col">
            {appointmentId ? (
            <div className="border-b p-4 flex">
                <Avatar className="h-12 w-12">
                    <AvatarImage
                        src={`/placeholder.svg?height=48&width=48&text=${doctorName.charAt(0)}`}
                        alt={doctorName}
                    />
                    <AvatarFallback>{doctorName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                {session?.user.role === "DOCTOR" ? (
                    <h2 className="text-lg pl-3 font-semibold flex justify-center items-center ">{patientName ? patientName : "Loading Patient's Name..."}</h2>
                ) : (
                    <h2 className="text-lg pl-3 font-semibold flex justify-center items-center ">{doctorName ? `Dr. ${doctorName}` : "Loading Doctor's Name..."}</h2>
                )}
                <p className="pl-3 text-gray-500 text-sm">
                    For: {concernTitle}
                </p>
                </div>
            </div>
                ) : null 
            }
            <div className="flex flex-col" style={{ height: '500px' }}>
                <ScrollArea className="flex-1 p-4">
                    {loadingMessages ? (
                        <LoadingSpinner />
                    ) : !appointmentId ? (
                        <div className="flex justify-center items-center h-full text-gray-500">
                            Select a conversation to view messages.
                        </div>
                    ) : messages.length === 0 ? (
                        <div className="flex justify-center items-center h-full text-gray-500">
                            No messages in this conversation yet.
                        </div>
                    ) : ( 
                        messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.sender === userType ? "justify-end" : "justify-start"} mb-4`}>
                            <Card className={`max-w-[70%] ${msg.sender === userType ? "bg-blue-500 text-white" : "bg-gray-100"}`}>
                                <CardContent className="p-3">
                                    <p>{msg.content}</p>
                                </CardContent>
                            </Card>
                        </div>
                    ))
                    )}
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