"use server";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import https from 'https';
import ChatList from "@/components/chat-list";
import Chat from "@/components/chat";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileInfo from "@/components/profile-info";

const agent = new https.Agent({
  rejectUnauthorized: false
});

export default async function Home() {
  return (
    <main className="flex h-[calc(100vh-56px)] flex-col items-center justify-between mx-7 my-7 bg-background rounded-lg shadow border">
      <div className="flex flex-row h-full w-full">
        <Tabs defaultValue="chats" className="flex flex-col">
          <div className="bg-secondary text-foreground px-2">
            <TabsList className="grid w-full grid-cols-2 h-16">
              <TabsTrigger value="chats">Chats</TabsTrigger>
              <TabsTrigger value="unread">Unread chats</TabsTrigger>
            </TabsList>
          </div>
          <ScrollArea className="flex flex-1">
            <TabsContent value="chats">
              <ChatList />
            </TabsContent>
            <TabsContent value="unread">
              <ChatList />
            </TabsContent>
          </ScrollArea>
          <div className="bg-muted border-t px-3">
            <ProfileInfo />
          </div>
        </Tabs>
        <Separator orientation="vertical" className="light:bg-gray-300 dark:bg-gray-900" />
        <Chat />
      </div>
    </main>
  );
}
