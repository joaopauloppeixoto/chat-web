"use client";

import { EllipsisVertical } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "./ui/avatar";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "./ui/button";

type ProfileInfoProps = {
}

export default function ProfileInfo({ }: ProfileInfoProps) {
  const { user } = useAuth();

  return (
    <div className="p-2 h-20 flex flex-row">
      <div className="my-auto flex flex-row gap-2 flex-1">
        <Avatar className="w-10 h-10">
          <AvatarImage src={`${user?.image}`} />
          <AvatarFallback className="border border-muted bg-primary text-primary-foreground">
            {user?.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-1">
          <div className="">{user?.name}</div>
          {/* <div className="text-xs">Last seen 1 hour ago</div>
        <div className="text-xs">Typing...</div> */}
        </div>
        <div>
          <Button variant="ghost">
            <EllipsisVertical className="absolute h-[1.2rem] w-[1.2rem] transition-all text-secondary-foreground" />
          </Button>
        </div>
      </div>
    </div>
  );
}
