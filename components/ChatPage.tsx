"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Settings, Search, Send } from "lucide-react"

export default function ChatPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)

  const conversations = [
    { id: "1", name: "John Doe", lastMessage: "Hey, how are you?", time: "2h", unread: true },
    { id: "2", name: "Jane Smith", lastMessage: "Did you see the news?", time: "1d", unread: false },
    { id: "3", name: "Alice Johnson", lastMessage: "Thanks for the help!", time: "3d", unread: false },
  ]

  const messages = [
    { id: "1", sender: "John Doe", content: "Hey, how are you?", time: "2:30 PM" },
    { id: "2", sender: "You", content: "I'm doing great, thanks! How about you?", time: "2:31 PM" },
    { id: "3", sender: "John Doe", content: "I'm good too. Did you watch the game last night?", time: "2:33 PM" },
    { id: "4", sender: "You", content: "Yes, it was amazing! That last-minute goal was incredible.", time: "2:35 PM" },
    { id: "5", sender: "John Doe", content: "I couldn't believe it when it happened.", time: "2:36 PM" },
  ]

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080")
  } , [])

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Conversations List */}
      <div className="w-1/3 bg-white border-r border-gray-200">
        <div className="p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Messages</h1>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <Separator />
        <ScrollArea className="h-[calc(100vh-73px)]">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 ${
                selectedConversation === conversation.id ? "bg-blue-50" : ""
              } ${conversation.unread ? "font-semibold" : ""}`}
              onClick={() => setSelectedConversation(conversation.id)}
            >
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={`/placeholder.svg?height=48&width=48&text=${conversation.name.charAt(0)}`}
                  alt={conversation.name}
                />
                <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="ml-4 flex-1">
                <div className="flex justify-between">
                  <span className="font-semibold">{conversation.name}</span>
                  <span className="text-sm text-gray-500">{conversation.time}</span>
                </div>
                <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            <div className="p-4 bg-white border-b border-gray-200">
              <div className="flex items-center">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={`/placeholder.svg?height=40&width=40&text=${conversations.find((c) => c.id === selectedConversation)?.name.charAt(0)}`}
                    alt={conversations.find((c) => c.id === selectedConversation)?.name}
                  />
                  <AvatarFallback>
                    {conversations.find((c) => c.id === selectedConversation)?.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <h2 className="ml-3 text-lg font-semibold">
                  {conversations.find((c) => c.id === selectedConversation)?.name}
                </h2>
              </div>
            </div>
            <ScrollArea className="flex-1 p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "You" ? "justify-end" : "justify-start"} mb-4`}
                >
                  <Card
                    className={`max-w-[70%] ${message.sender === "You" ? "bg-blue-500 text-white" : "bg-gray-100"}`}
                  >
                    <CardContent className="p-3">
                      <p>{message.content}</p>
                      <p className={`text-xs ${message.sender === "You" ? "text-blue-100" : "text-gray-500"} mt-1`}>
                        {message.time}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </ScrollArea>
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <Input className="flex-1" placeholder="Start a new message" />
                <Button size="icon">
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <p className="text-xl text-gray-500">Select a conversation to start messaging</p>
          </div>
        )}
      </div>
    </div>
  )
}

