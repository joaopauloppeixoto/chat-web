"use client";

import {
  EllipsisVertical,
  LogOut,
  Mail,
  MessageSquare,
  MonitorCog,
  Moon,
  PlusCircle,
  Settings,
  Sun,
  SunMoon,
  User,
  UserPlus,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "./ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { useTheme } from "next-themes";
import Link from "next/link";

type ProfileInfoProps = {};

export default function ProfileInfo({}: ProfileInfoProps) {
  const { theme, setTheme } = useTheme();
  const { user, troggleProfile } = useAuth();

  return (
    <div className="h-20 flex flex-row">
      <div className="my-auto flex flex-row gap-3 flex-1 justify-between">
        <div
          className="flex flex-row gap-3 hover:bg-[rgba(0,0,0,.15)] transition-colors p-1 w-full rounded-xl cursor-pointer"
          onClick={troggleProfile}
        >
          <Avatar className="w-10 h-10">
            <AvatarImage src={`${user?.image}`} />
            <AvatarFallback className="border border-muted bg-primary text-primary-foreground">
              {user?.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-1">
            <div>
              {user?.name} {user?.surname}
            </div>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="hover:bg-[rgba(0,0,0,.15)] my-auto"
            >
              <EllipsisVertical className="absolute h-[1.2rem] w-[1.2rem] transition-all text-secondary-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={troggleProfile}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuGroup>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <SunMoon className="mr-2 h-4 w-4" />
                    <span>Themes</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuCheckboxItem
                        checked={theme == "light"}
                        onCheckedChange={() => setTheme("light")}
                      >
                        <Sun className="mr-2 h-4 w-4" />
                        <span>Light</span>
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={theme == "dark"}
                        onCheckedChange={() => setTheme("dark")}
                      >
                        <Moon className="mr-2 h-4 w-4" />
                        <span>Dark</span>
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem
                        checked={theme == "system"}
                        onCheckedChange={() => setTheme("system")}
                      >
                        <MonitorCog className="mr-2 h-4 w-4" />
                        <span>System</span>
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuGroup>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <Link href="/api/auth/signout">
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
