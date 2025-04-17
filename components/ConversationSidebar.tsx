"use client";

import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ChevronLeft } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Conversation {
    id: number;
    doctorName: string;
    patient: {
        user: { name: string  , lastSeen?: Date | string | null};
    };
    doctor: {
        user: { name: string , lastSeen?: Date | string | null};
    };
    messages: Array<{
        content: string;
        createdAt: string;
        isRead: boolean;
        sender: string;
    }>;
    unReadCount?: number;
}

interface ConversationsSidebarProps {
}

const ConversationsSidebar: React.FC<ConversationsSidebarProps> = () => {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    const { data: session, status } = useSession();
    const userType = session?.user.role;

    useEffect(() => {
        if (status === "authenticated" && userType) {
            const fetchConversations = async () => {
                setLoading(true);
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
                } finally {
                    setLoading(false);
                }
            };
            fetchConversations();
        }
    }, [status, userType]);


    const getLastSeenText = (lastSeen: Date | string | null | undefined) => {
        if (!lastSeen) return "Last seen: Never";

        const dateLastSeen = new Date(lastSeen);

        if (isNaN(dateLastSeen.getTime())) {
            return "Last seen: Unknown";
        }

        try {
            return `${formatDistanceToNow(dateLastSeen, { addSuffix: true })}`;
        } catch (error) {
            console.error("Error formatting last seen date:", error);
            return "Last seen: Recently";
        }
    };


    return (
        <div className="w-full sm:w-1/3 border-r border-gray-200 ">
            <div className="flex justify-normal border-b border-gray-200">
                        <button className="flex w-fit justify-center items-center p-2 m-2 border rounded-full hover:bg-slate-300" onClick={() => {userType === "DOCTOR" ? router.push('/dashboard/doctor') : router.push('/dashboard/patient')}}>
                    <ChevronLeft />
                </button>
                <div className="flex justify-center items-center w-full p-4 text-xl font-satoshi">
                    Conversations
                </div>
            </div>
            <ScrollArea className="h-full">
                {loading ? (
                    <div className="text-center text-gray-500 p-4">Loading conversations...</div>
                ) :conversations.length === 0 ? (
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
                                <Avatar className="h-12 w-12">
                                    <AvatarImage
                                        src={`/placeholder.svg?height=32&width=32&text=${conversation.doctorName.charAt(0)}`}
                                        alt={conversation.doctorName}
                                    />
                                    <AvatarFallback>{conversation.doctorName.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex justify-between w-full">
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
                                <p className="text-xs text-gray-400">
                                        {session?.user.role === "DOCTOR" ? (
                                            getLastSeenText(conversation.patient.user.lastSeen)
                                        ) : (
                                            getLastSeenText(conversation.doctor.user.lastSeen)
                                        )}
                                    </p>
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