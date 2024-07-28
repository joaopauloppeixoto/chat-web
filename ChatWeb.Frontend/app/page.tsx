"use server";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getServerSession } from "next-auth/next"
import https from 'https';
import ThemeButton from "@/components/theme-button";
import ChatList from "@/components/chat-list";
import MessageList from "@/components/message-list";
import SelectedChatInfo from "@/components/selected-chat-infos";

const agent = new https.Agent({
  rejectUnauthorized: false
});

export default async function Home() {
  const session = await getServerSession();

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
                <ChatList />
              </TabsContent>
              <TabsContent value="unread">
                <ChatList />
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel className="p-4">
          <div className="flex flex-row justify-between h-full">
            <div className="flex flex-col gap-3 w-full h-full">
              <div className="flex flex-row justify-between">
                <SelectedChatInfo />
                <div className="my-auto">
                  <ThemeButton />
                </div>
              </div>
              <Separator />
              <div className="flex-1 h-56">
                <MessageList />
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
