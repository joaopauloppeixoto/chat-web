import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function ChatItem() {
  return (
    <div className="border shadow px-5 py-2 rounded flex flex-row mb-1 gap-2">
      <Avatar className="w-12 h-12">
        <AvatarImage src="https://github.com/joaopauloppeixoto.png" />
        <AvatarFallback>JP</AvatarFallback>
      </Avatar>
      <div className="">
        <div className="text-sm">João Paulo</div>
        <div className="text-xs text-zinc-500">Last seen 1 hour ago</div>
      </div>
    </div>
  );
}
