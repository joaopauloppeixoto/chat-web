'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import api from "@/lib/axios";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type AuthContextProps = {
  children: ReactNode;
  token?: string;
  baseUrl: string;
}

type AuthContextData = {
  user: User | undefined;
  token: string;
  apiUrl: string;
  troggleProfile: () => void;
}

type User = {
  id: string;
  email: string;
  name: string;
  surname: string;
  createdAt: Date;
  lastSeenAt: Date;
  image?: string;
}

export const AuthContextProvider = ({ children, token, baseUrl }: AuthContextProps) => {
  const [user, setUser] = useState<User | undefined>();
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!user) {
      api.get(`${baseUrl}/account/info`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((result) => {
        setUser(result.data);
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      token: token,
      apiUrl: baseUrl,
      user: user,
      troggleProfile: () => setIsProfileOpen(!isProfileOpen)
    } as AuthContextData}>
      <>
        {children}
        <Sheet open={isProfileOpen} onOpenChange={(value) => setIsProfileOpen(value)}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 my-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" defaultValue={user?.name} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="surname" className="text-right">
                  Surname
                </Label>
                <Input id="surname" defaultValue={user?.surname} className="col-span-3" />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </>
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext);
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);
