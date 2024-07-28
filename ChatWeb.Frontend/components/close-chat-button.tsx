'use client';

import { X } from "lucide-react";
import { Button } from "./ui/button";
import { useMessages } from "@/contexts/message-context";

export default function CloseChatButton() {
  const { setSelectedChat } = useMessages();

  return (
    <Button variant="destructive" size="icon" onClick={() => setSelectedChat(undefined)}>
      <X className="absolute h-[1.2rem] w-[1.2rem] scale-100 transition-all rotate-0" />
      <span className="sr-only">Close chat</span>
    </Button>
  );
}