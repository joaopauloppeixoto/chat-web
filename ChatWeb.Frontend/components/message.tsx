"use client";

import { ReactNode } from "react";

export type MessageProps = {
  isFromUser: boolean;
  children: ReactNode;
}

export default function Message({ isFromUser, children }: MessageProps) {
  return (
    <div className={`flex w-max max-w-[75%] flex-col gap-2 rounded px-3 py-2 text-sm ${!isFromUser ? "bg-muted" : "ml-auto bg-primary text-primary-foreground"}`}>
      {children}
    </div>
  );
}
