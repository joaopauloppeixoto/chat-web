"use client";

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
  ContextMenuShortcut,
  ContextMenuTrigger
} from "./ui/context-menu";

type ChatItemProps = {
  chat: Chat;
}

export default function ChatItem({ chat }: ChatItemProps) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card className="shadow px-5 py-2 rounded flex flex-row mb-1 gap-2">
          <Avatar className="w-12 h-12">
            <AvatarImage src={`${chat.image}`} />
            <AvatarFallback>{chat.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="">
            <div className="text-sm">{chat.name}</div>
            <div className="text-xs">{chat.description}</div>
          </div>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
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
