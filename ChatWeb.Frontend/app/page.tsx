import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatItem from "@/components/chat-item";

export default function Home() {
  return (
    <main className="flex h-[calc(100vh-56px)] flex-col items-center justify-between mx-7 my-7 bg-white rounded-lg shadow">
      <ResizablePanelGroup
        direction="horizontal"
        className="h-[calc(100vh-56px)]"
      >
        <ResizablePanel className="min-w-80 max-w-96 flex flex-col gap-4">
          <div className="flex flex-row justify-between px-7 pt-7">
            <h1 className="font-bold text-zinc-600 text-sm font-sans">Chats</h1>
          </div>
          <ScrollArea className="h-[100%] w-full px-2 pb-2">
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
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel className="p-7"></ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
