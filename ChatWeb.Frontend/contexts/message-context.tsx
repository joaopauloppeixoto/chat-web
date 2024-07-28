'use client';

import { Chat } from "@/components/chat-list";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

type MessageContextProviderProps = {
  children: ReactNode;
}

type MessageContextData = {
  selectedChat: Chat;
  setSelectedChat: Dispatch<SetStateAction<Chat | undefined>>;
}

export const MessageContextProvider = ({ children }: MessageContextProviderProps) => {
  const [selectedChat, setSelectedChat] = useState<Chat | undefined>();

  return (
    <MessageContext.Provider value={{
      selectedChat: selectedChat,
      setSelectedChat: setSelectedChat
    } as MessageContextData}>
      {children}
    </MessageContext.Provider>
  )
}

export const useMessages = () => {
  return useContext(MessageContext);
}

const MessageContext = createContext<MessageContextData>({} as MessageContextData);
