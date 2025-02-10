"use client";

import React from "react";
import ChatSection from "@/components/ChatSection";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import ConversationsSidebar from "./ConversationSidebar";

const ChatPage = () => {
    const searchParams = useSearchParams();
    const appointmentId = searchParams.get('appointmentId');
    const router = useRouter();


    return (
        <div className="flex h-2/3 w-full">
            <ConversationsSidebar /> 
            <ChatSection appointmentId={appointmentId} />
        </div>
    );
};

export default ChatPage;