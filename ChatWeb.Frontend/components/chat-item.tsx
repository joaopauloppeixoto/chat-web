"use client";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card } from "./ui/card";
import { ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger } from "./ui/context-menu";

export default function ChatItem() {

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card className="shadow px-5 py-2 rounded flex flex-row mb-1 gap-2">
          <Avatar className="w-12 h-12">
            <AvatarImage src="https://github.com/joaopauloppeixoto.png" />
            <AvatarFallback>JP</AvatarFallback>
          </Avatar>
          <div className="">
            <div className="text-sm">João Paulo</div>
            <div className="text-xs">Last seen 1 hour ago</div>
          </div>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuCheckboxItem checked>
          Pin
          <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
        </ContextMenuCheckboxItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>Theme</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuRadioItem value="colm">Dark</ContextMenuRadioItem>
            <ContextMenuRadioItem value="colm">Light</ContextMenuRadioItem>
            <ContextMenuSeparator />
            <ContextMenuRadioItem value="colm">System</ContextMenuRadioItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  );
}
