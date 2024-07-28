"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import api from "@/lib/axios";
import { ScrollArea } from "./ui/scroll-area";
import { useMessages } from "@/contexts/message-context";
import Message from "./message";

export type Message = {
  content: string,
  sentDate: Date,
  senderId: string
}

export default function MessageList() {
  const { token, apiUrl, user } = useAuth();
  const { selectedChat } = useMessages();
  const [messageList, setMessageList] = useState<Array<Message>>();

  useEffect(() => {
    if (selectedChat?.id) {
      api.get(`${apiUrl}/message/${selectedChat.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((result) => {
        setMessageList(result.data);
      });
    }
  }, [selectedChat]);

  return (
    <ScrollArea className="h-full w-full px-2 pb-2">
      <div className="w-full max-w-7xl mx-auto flex flex-col">
        {messageList?.map(m => {
          return <Message isFromUser={m.senderId == user?.id}>{m.content}</Message>
        })}
      </div>
    </ScrollArea>
  );
}
