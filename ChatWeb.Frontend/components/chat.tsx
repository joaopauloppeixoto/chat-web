"use client";

import { Send } from "lucide-react";
import CloseChatButton from "./close-chat-button";
import MessageList from "./message-list";
import SelectedChatInfo from "./selected-chat-infos";
import ThemeButton from "./theme-button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";
import { useAuth } from "@/contexts/auth-context";
import { useMessages } from "@/contexts/message-context";

export default function Chat() {
  const { user } = useAuth();
  const { selectedChat } = useMessages();

  return (
    <div className={`flex flex-row justify-between h-full w-full ${!selectedChat ? "hidden" : ""}`}>
      <div className="flex flex-col w-full h-full">
        <SelectedChatInfo
          buttons={
            <>
              <ThemeButton />
              <CloseChatButton />
            </>
          }
        />
        <div className="flex-1 h-56">
          <MessageList />
        </div>
        <Separator />
        <div className="flex flex-row gap-4 px-7 py-3 bg-secondary h-20">
          <Textarea placeholder="Your message here" className="resize-none min-h-10" />
          <Button size="sm" className="w-10 h-10 m-auto"><Send className="w-4 h-4" /></Button>
        </div>
      </div>
    </div>
  );
}