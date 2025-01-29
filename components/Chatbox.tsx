"use client";

import * as React from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export default function ChatBox() {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState([
    { sender: "doctor", text: "Hello, how can I help you today?" },
  ]);
  const [input, setInput] = React.useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "patient", text: input }]);
    setInput("");
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        
      </DrawerTrigger>
      <DrawerContent className="p-4">
        <DrawerHeader>
          <DrawerTitle>Chat with Doctor</DrawerTitle>
        </DrawerHeader>

        {/* Chat Messages */}
        <div className="h-64 overflow-y-auto max-w-sm bg-gray-100 p-4 rounded-lg">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 my-1 rounded-lg ${
                msg.sender === "doctor"
                  ? "bg-blue-500 text-white self-start"
                  : "bg-gray-300 self-end"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input Field */}
        <div className="mt-4 flex">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-lg"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={sendMessage} className="ml-2">
            <Send size={18} />
          </Button>
        </div>

        <DrawerClose asChild>
          <Button variant="outline" className="mt-4 w-full">
            Close Chat
          </Button>
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
}
