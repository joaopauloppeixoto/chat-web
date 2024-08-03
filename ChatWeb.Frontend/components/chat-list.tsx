"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import api from "@/lib/axios";
import ChatItem from "./chat-item";
import CardItemSkeleton from "./chat-item-skeleton";
import { MessageCircleOffIcon } from "lucide-react";

export type Chat = {
  id: string;
  name?: string;
  description?: string;
  image?: string;
  chatWithId?: string;
};

export default function ChatList() {
  const { token, apiUrl } = useAuth();
  const [chatList, setChatList] = useState<Array<Chat>>();

  useEffect(() => {
    api
      .get(`${apiUrl}/message/chats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setChatList(result.data);
      });
  }, []);

  return chatList ? (
    <div className="w-[380px]">
      {chatList.length > 0 ? (
        <>
          {chatList?.map((c) => (
            <ChatItem chat={c} />
          ))}
        </>
      ) : (
        <div className="flex flex-col justify-center align-middle gap-6 mt-10">
          <span className="mx-auto text-muted-foreground">
            There's no chat to show.
          </span>
          <MessageCircleOffIcon className="w-24 h-24 text-muted mx-auto" />
        </div>
      )}
    </div>
  ) : (
    <div className="mx-3">
      <CardItemSkeleton />
      <CardItemSkeleton />
      <CardItemSkeleton />
    </div>
  );
}
