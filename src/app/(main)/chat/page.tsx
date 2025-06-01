"use client";

import { useSocket } from "@/components/providers/socket-provider";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { formatDate } from "@/lib/date";
import { cn } from "@/lib/utils";
import {
  Copy,
  Download,
  Loader2,
  Send,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

interface Message {
  id: string;
  role: "agent" | "user";
  content: string;
  timestamp: string;
  isStreaming?: boolean;
}

export default function ChatInterface() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socket = useSocket();
  const currentStreamingId = useRef<string | null>(null);

  useEffect(() => {
    if (!socket.isConnected || !socket.socket) return;
    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        switch (data.type) {
          case "stream_token":
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === data.message_id
                  ? {
                      ...msg,
                      content: msg.content + data.token,
                      isStreaming: true,
                    }
                  : msg
              )
            );
            currentStreamingId.current = data.message_id;
            break;

          case "stream_end":
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === data.message_id
                  ? { ...msg, isStreaming: false }
                  : msg
              )
            );
            currentStreamingId.current = null;
            break;

          case "chat_message":
            setMessages((prev) => [
              ...prev,
              {
                id: data.message_id,
                role: "agent",
                content: data.message,
                timestamp: new Date().toISOString(),
                isStreaming: false,
              },
            ]);
            break;

          case "error":
            toast.error(data.error);
            break;
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    socket.socket.onmessage = handleMessage;

    return () => {
      if (socket.socket) {
        socket.socket.onmessage = null;
      }
    };
  }, [socket.isConnected, socket.socket]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    const userMessageId = Date.now().toString();
    const botMessageId = (Date.now() + 1).toString();

    setMessages((prev) => [
      ...prev,
      {
        id: userMessageId,
        role: "user",
        content: input,
        timestamp: new Date().toISOString(),
      },
    ]);

    setMessages((prev) => [
      ...prev,
      {
        id: botMessageId,
        role: "agent",
        content: "",
        timestamp: new Date().toISOString(),
        isStreaming: true,
      },
    ]);

    try {
      socket.sendMessage({
        type: "chat_message",
        content: input,
        message_id: botMessageId,
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error");
      setMessages((prev) => prev.filter((msg) => msg.id !== botMessageId));
    } finally {
      setInput("");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-70px)]">
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-2 max-w-[100%]",
                  message.role === "user" && "justify-end"
                )}
              >
                {message.role === "agent" && (
                  <div className="h-8 w-8 rounded-full bg-primary flex-shrink-0 flex justify-center items-center text-white font-bold">
                    A
                  </div>
                )}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">
                      {message.role === "agent" ? "Agent" : "You"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(message.timestamp, "date")}{" "}
                      {formatDate(message.timestamp, "time")}
                    </span>
                    {message.isStreaming && (
                      <span className="text-xs text-muted-foreground">
                        (AI is thinking...)
                      </span>
                    )}
                  </div>
                  <div
                    className={cn(
                      "p-3 rounded-lg",
                      message.role === "agent" ? "bg-muted/50" : "bg-primary/10"
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap">
                      {message.content}
                      {message.isStreaming && (
                        <span className="ml-1 inline-block h-2 w-2 animate-pulse rounded-full bg-current align-middle" />
                      )}
                    </p>
                  </div>
                  {message.role === "agent" && !message.isStreaming && (
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ThumbsDown className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>
      <div className="p-4 border-t">
        <div className="flex gap-2 items-center">
          <Textarea
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[44px] max-h-32"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            disabled={isLoading}
          />
          <Button onClick={handleSubmit} disabled={isLoading || !input.trim()}>
            {isLoading ? <Loader2 className="animate-spin" /> : <Send />}
          </Button>
        </div>
      </div>
    </div>
  );
}
