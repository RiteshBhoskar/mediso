"use client";

import React, { useEffect, Suspense } from "react";
import ChatSection from "@/components/ChatSection";
import { useSearchParams } from "next/navigation";
import ConversationsSidebar from "./ConversationSidebar";

function ChatPageLoading() {
    return <div className="flex items-center justify-center h-full w-full">Loading Chat...</div>
}

const ChatPageContent = () => {
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


const ChatPage = () => {
    return (
        <Suspense fallback={<ChatPageLoading />}>
            <ChatPageContent />
        </Suspense>
    );
};

export default ChatPage;