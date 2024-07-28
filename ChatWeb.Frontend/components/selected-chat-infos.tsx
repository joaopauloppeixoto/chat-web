"use client";

import { useMessages } from "@/contexts/message-context";
import { Chat } from "./chat-list";
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "./ui/avatar";
import { Separator } from "./ui/separator";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { useAuth } from "@/contexts/auth-context";

type SelectedChatInfoProps = {
}

export default function SelectedChatInfo({ }: SelectedChatInfoProps) {
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
    }
  }, [selectedChat]);

  return (
    <div className="flex flex-row gap-2">
      <Avatar className="w-12 h-12 my-auto">
        <AvatarImage src={`${chatInfos?.image}`} />
        <AvatarFallback>{chatInfos?.name?.charAt(0)}</AvatarFallback>
      </Avatar>
      <Separator orientation="vertical" />
      <div className="">
        <div className="font-semibold">{chatInfos?.name}</div>
        {/* <div className="text-xs">Last seen 1 hour ago</div>
        <div className="text-xs">Typing...</div> */}
      </div>
    </div>
  );
}
