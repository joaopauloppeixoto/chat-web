"use client";

import { useMessages } from "@/contexts/message-context";
import { Chat } from "./chat-list";
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "./ui/avatar";
import { ReactNode, useEffect, useState } from "react";
import api from "@/lib/axios";
import { useAuth } from "@/contexts/auth-context";

type SelectedChatInfoProps = {
  buttons: ReactNode
}

export default function SelectedChatInfo({ buttons }: SelectedChatInfoProps) {
  const { token, apiUrl } = useAuth();
  const { selectedChat } = useMessages();

  const [chatInfos, setChatInfos] = useState<Chat | undefined>();

  useEffect(() => {
    if (selectedChat?.chatWithId) {
      api.get(`${apiUrl}/account/find/?guid=${selectedChat.chatWithId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((result) => {
        setChatInfos(result.data);
      });
    } else {
      setChatInfos(undefined);
    }
  }, [selectedChat]);

  return (
    <div className={`flex flex-row justify-between px-7 py-2 ${selectedChat ? "bg-secondary text-foreground" : ""}`}>
      <div className={`flex flex-row flex-1 gap-3`}>
        {chatInfos && <>
          <Avatar className="w-12 h-12 my-auto shadow-sm">
            <AvatarImage src={`${chatInfos?.image}`} />
            <AvatarFallback className="border border-muted bg-primary text-primary-foreground">{chatInfos?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="">
            <div className="font-semibold">{chatInfos?.name}</div>
            {/* <div className="text-xs">Last seen 1 hour ago</div>
        <div className="text-xs">Typing...</div> */}
          </div>
        </>}
      </div>
      <div className="my-auto flex flex-row gap-2">
        {buttons}
      </div>
    </div>
  );
}
