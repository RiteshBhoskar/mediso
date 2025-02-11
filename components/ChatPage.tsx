"use client";

import React, { useEffect } from "react";
import ChatSection from "@/components/ChatSection";
import { useSearchParams } from "next/navigation";
import ConversationsSidebar from "./ConversationSidebar";

const ChatPage = () => {
    const searchParams = useSearchParams();
    const appointmentId = searchParams.get('appointmentId');

    useEffect(() => {
      const intervalId = setInterval(async () => {
        try {
            await fetch('/api/last-seen', { method: 'POST' });
            console.log("Last seen updated");
        } catch (error) {
            console.error("Error updating last seen:", error);
        }
    }, 1500000);

    return () => clearInterval(intervalId);
    }, [])

    return (
        <div className="flex h-2/3 w-full">
            <ConversationsSidebar /> 
            <ChatSection appointmentId={appointmentId} />
        </div>
    );
};

export default ChatPage;