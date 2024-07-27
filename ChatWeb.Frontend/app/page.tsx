"use server";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatItem from "@/components/chat-item";
import { Sun, Moon, Send } from "lucide-react";
import { useTheme } from "next-themes";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect } from "react";
import api from "@/lib/axios";
import { getServerSession } from "next-auth/next"
import { cookies } from "next/headers";
import https from 'https';
import axios from "@/lib/axios";
import ThemeButton from "@/components/theme-button";

const agent = new https.Agent({
  rejectUnauthorized: false
});

export default async function Home() {
  const session = await getServerSession();
  const token = await cookies().get('token')?.value;

  const result = (await axios.get(process.env.API_URL + '/account/info', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })).data;

  console.log('session', session);

  return (
    <main className="flex h-[calc(100vh-56px)] flex-col items-center justify-between mx-7 my-7 bg-background rounded-lg shadow border">
      <ResizablePanelGroup
        direction="horizontal"
        className="h-[calc(100vh-56px)]"
      >
        <ResizablePanel defaultSize={80} className="min-w-80 max-w-96 flex flex-col gap-4">
          <Tabs defaultValue="chats">
            <TabsList className="flex flex-row justify-around mx-2 mt-2">
              <TabsTrigger value="chats">Chats</TabsTrigger>
              <TabsTrigger value="unread">Unread chats</TabsTrigger>
            </TabsList>
            <ScrollArea className="h-[100%-8px] w-full px-2 pb-2">
              <TabsContent value="chats">
                <ChatItem />
                <ChatItem />
                <ChatItem />
                <ChatItem />
                <ChatItem />
                <ChatItem />
                <ChatItem />
                <ChatItem />
                <ChatItem />
                <ChatItem />
                <ChatItem />
                <ChatItem />
                <ChatItem />
                <ChatItem />
                <ChatItem />
                <ChatItem />
                <ChatItem />
              </TabsContent>
              <TabsContent value="unread">
                <ChatItem />
                <ChatItem />
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel className="p-4">
          <div className="flex flex-row justify-between h-full">
            <div className="flex flex-col gap-3 w-full h-full">
              <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-2">
                  <Avatar className="w-12 h-12 my-auto">
                    <AvatarImage src="https://github.com/joaopauloppeixoto.png" />
                    <AvatarFallback>JP</AvatarFallback>
                  </Avatar>
                  <Separator orientation="vertical" />
                  <div className="">
                    <div className="font-semibold">João Paulo</div>
                    <div className="text-xs">Last seen 1 hour ago</div>
                    <div className="text-xs">Typing...</div>
                  </div>
                </div>
                <div className="my-auto">
                  <ThemeButton />
                </div>
              </div>
              <Separator />
              <div className="flex-1 h-56">
                <ScrollArea className="h-full w-full px-2 pb-2">
                  <div className="w-full max-w-7xl mx-auto flex flex-col">
                    <div className="flex w-max max-w-[75%] flex-col gap-2 rounded px-3 py-2 text-sm bg-muted">Hello!</div>
                    <div className="flex w-max max-w-[75%] flex-col gap-2 rounded px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground">Hello, how are you?</div>
                    <div className="flex w-max max-w-[75%] flex-col gap-2 rounded px-3 py-2 text-sm bg-muted">I'm fine, thanks for asking!</div>
                  </div>
                </ScrollArea>
              </div>
              <Separator />
              <div className="flex flex-row gap-2">
                <Avatar className="w-10 h-10 m-auto">
                  <AvatarImage src={`${session?.user?.image}`} />
                  <AvatarFallback>{session?.user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <Textarea placeholder="Your message here" className="resize-none" />
                <Button size="sm" className="w-10 h-10 m-auto"><Send className="w-4 h-4" /></Button>
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
