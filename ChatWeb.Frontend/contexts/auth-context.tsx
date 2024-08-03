"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import api from "@/lib/axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useToast } from "@/components/ui/use-toast";

type AuthContextProps = {
  children: ReactNode;
  token?: string;
  baseUrl: string;
};

type AuthContextData = {
  user: User | undefined;
  token: string;
  apiUrl: string;
  troggleProfile: () => void;
};

type User = {
  id: string;
  email: string;
  name: string;
  surname: string;
  createdAt: Date;
  lastSeenAt: Date;
  image?: string;
};

type Inputs = {
  name: string;
  surname: string;
};

export const AuthContextProvider = ({
  children,
  token,
  baseUrl,
}: AuthContextProps) => {
  const { toast } = useToast();

  const [user, setUser] = useState<User | undefined>();
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    if (data.name !== user?.name || data.surname !== user.surname) {
      api
        .patch(
          `${baseUrl}/account/rename`,
          {
            id: user?.id,
            name: data.name,
            surname: data.surname,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          toast({
            title: "Successfully updated.",
            description: "Your name and surname were successfully updated.",
          });

          if (user) {
            setUser({
              ...user,
              name: data.name,
              surname: data.surname,
            });
          }
        });
    }
  };

  useEffect(() => {
    if (!user) {
      api
        .get(`${baseUrl}/account/info`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((result) => {
          setUser(result.data);
        });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={
        {
          token: token,
          apiUrl: baseUrl,
          user: user,
          troggleProfile: () => setIsProfileOpen(!isProfileOpen),
        } as AuthContextData
      }
    >
      <>
        {children}
        <Sheet
          open={isProfileOpen}
          onOpenChange={(value) => setIsProfileOpen(value)}
        >
          <SheetContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-3"
            >
              <SheetHeader>
                <SheetTitle>Edit profile</SheetTitle>
                <SheetDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 my-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    defaultValue={user?.name}
                    {...register("name")}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="surname" className="text-right">
                    Surname
                  </Label>
                  <Input
                    id="surname"
                    defaultValue={user?.surname}
                    {...register("surname")}
                    className="col-span-3"
                  />
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit">Save changes</Button>
                </SheetClose>
              </SheetFooter>
            </form>
          </SheetContent>
        </Sheet>
      </>
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);
