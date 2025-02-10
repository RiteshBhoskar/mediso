"use client";

import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Conversation {
    id: number;
    doctorName: string;
    patient: {
        user: { name: string };
    };
    doctor: {
        user: { name: string };
    };
    messages: Array<{
        content: string;
        createdAt: string;
        isRead: boolean;
        sender: string;
    }>;
    unReadCount?: number | 0;
}

interface ConversationsSidebarProps {
}

const ConversationsSidebar: React.FC<ConversationsSidebarProps> = () => {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const router = useRouter();
    const { data: session, status } = useSession();
    const userType = session?.user.role;

    useEffect(() => {
        if (status === "authenticated" && userType) {
            const fetchConversations = async () => {
                try {
                    const response = await fetch("/api/conversations");
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const conversationsData = await response.json();
                    if (conversationsData.conversations) {
                        setConversations(conversationsData.conversations);
                    }
                } catch (error) {
                    console.error("Error fetching conversations:", error);
                    toast.error("Failed to load conversations.");
                }
            };
            fetchConversations();
        }
    }, [status, userType]);

    return (
        <div className="w-1/3 border-r border-gray-200 hidden md:block">
            <div className="flex justify-normal border-b border-gray-200">
                <div className="flex justify-center items-center w-full p-4 text-xl font-satoshi">
                    Conversations
                </div>
            </div>
            <ScrollArea className="h-full">
                {conversations.length === 0 ? (
                    <div className="text-center text-gray-500 p-4">No conversations yet.</div>
                ) : (
                    conversations.map((conversation) => (
                        <div
                            key={conversation.id}
                            className="p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                            onClick={() => {
                                router.push(`/dashboard/chat?appointmentId=${conversation.id}`);
                            }}
                        >
                            <div className="flex items-center space-x-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage
                                        src={`/placeholder.svg?height=32&width=32&text=${conversation.doctorName.charAt(0)}`}
                                        alt={conversation.doctorName}
                                    />
                                    <AvatarFallback>{conversation.doctorName.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    {session?.user.role === "DOCTOR" ? (//@ts-ignore
                                        <p className={`font-semibold ${conversation.unReadCount > 0 ? 'font-bold' : 'font-semibold'}`}>{conversation.patient.user.name}</p>
                                    ) : (//@ts-ignore
                                        <p className={`font-semibold ${conversation.unReadCount > 0 ? 'font-bold' : 'font-semibold'}`}>{conversation.doctor.user.name}</p>
                                    )}
                                    {conversation.messages && conversation.messages.length > 0 && (
                                        <p className="text-sm text-gray-500 truncate">
                                            {conversation.messages[0].content}
                                        </p>
                                    )}
                                    {!conversation.messages || conversation.messages.length === 0 && (
                                        <p className="text-sm text-gray-500 italic">No messages yet</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </ScrollArea>
        </div>
    );
};

export default ConversationsSidebar;