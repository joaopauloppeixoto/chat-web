"use client";

import { Send } from "lucide-react";
import CloseChatButton from "./close-chat-button";
import MessageList from "./message-list";
import SelectedChatInfo from "./selected-chat-infos";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";
import { useMessages } from "@/contexts/message-context";
import { useState } from "react";
import api from "@/lib/axios";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "./ui/use-toast";

export default function Chat() {
  const { apiUrl, token } = useAuth();
  const { selectedChat } = useMessages();
  const { toast } = useToast();
  const [newMessage, setNewMessage] = useState<string>("");

  const sendMessage = () => {
    // ToDo: Clear TextArea and state, send message to sending messages list...
    api.post(`${apiUrl}/message`, {
      groupId: selectedChat.id,
      content: newMessage
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(() => {
      // ToDo: Confirm the message
    }).catch((error) => {
      console.error(error);
      toast({ title: 'Erro', description: "The message wasn't sent." });
    });
  }

  return (
    <div className={`flex flex-row justify-between h-full w-full ${!selectedChat ? "hidden" : ""}`}>
      <div className="flex flex-col w-full h-full">
        <SelectedChatInfo
          buttons={<CloseChatButton />}
        />
        <div className="flex-1 h-56">
          <MessageList />
        </div>
        <Separator />
        <div className="flex flex-row gap-4 px-7 py-3 bg-secondary h-20">
          <Textarea
            placeholder="Your message here"
            className="resize-none min-h-10"
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button
            size="sm"
            className="w-10 h-10 m-auto"
            onClick={sendMessage}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}