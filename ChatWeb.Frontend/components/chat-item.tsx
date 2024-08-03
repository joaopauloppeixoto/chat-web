"use client";

import { useMessages } from "@/contexts/message-context";
import { Chat } from "./chat-list";
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "./ui/avatar";
import { Card } from "./ui/card";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger
} from "./ui/context-menu";
import { Separator } from "./ui/separator";

type ChatItemProps = {
  chat: Chat;
}

export default function ChatItem({ chat }: ChatItemProps) {
  const { selectedChat, setSelectedChat } = useMessages();
  const isSelected = selectedChat?.id == chat?.id;

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card
          className={`shadow px-5 py-2 rounded flex flex-row mb-1 gap-2 cursor-pointer mx-2 transition-all ${isSelected ? "border-l-primary rounded-none border-l-8 bg-secondary" : ""}`}
          onClick={() => setSelectedChat(chat)}
        >
          <Avatar className="w-12 h-12">
            <AvatarImage src={`${chat.image}`} />
            <AvatarFallback className={isSelected ? "bg-primary text-primary-foreground" : ""}>{chat.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="">
            <div className="text-sm">{chat.name}</div>
            <div className="text-xs">{chat.description}</div>
          </div>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem inset onClick={() => setSelectedChat(chat)}>
          Open
        </ContextMenuItem>
        <Separator />
        <ContextMenuCheckboxItem checked>
          Pin
          <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>
          Mutted
          <ContextMenuShortcut>⌘⇧M</ContextMenuShortcut>
        </ContextMenuCheckboxItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
