"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resizeBase64Img } from "@/lib/resize-base-64";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

  const [newProfilePicture, setNewProfilePicture] = useState<
    string | undefined
  >();
  const [user, setUser] = useState<User | undefined>();
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    if (newProfilePicture) {
      api
        .patch(
          `${baseUrl}/account/image`,
          {
            file: newProfilePicture,
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
            description: "Your account image was successfully updated.",
          });

          if (user) {
            setUser({
              ...user,
              image: newProfilePicture,
            });
          }
        })
        .catch((error) => {
          toast({
            title: "Error",
            description: `We couldn't update your account image.`,
          });

          console.error(error);
        });
    }
  }, [newProfilePicture]);

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    if (data.name !== user?.name || data.surname !== user.surname) {
      api
        .patch(
          `${baseUrl}/account/rename`,
          {
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
        })
        .catch((error) => {
          toast({
            title: "Error",
            description: `We couldn't update your name.`,
          });

          console.error(error);
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
        })
        .catch((error) => {
          toast({
            title: "Error",
            description: `We couldn't update your name.`,
          });

          console.error(error);
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
              {user && (
                <div className="flex flex-col gap-4 my-4">
                  <Separator />
                  <Label
                    htmlFor="photo-profile"
                    className="text-right rounded-lg cursor-pointer flex flex-col gap-3"
                  >
                    <h2>Account image</h2>
                    <p className="text-muted-foreground">
                      Click to upload a new account image
                    </p>
                    <Avatar className="w-24 h-24 mx-auto">
                      <AvatarImage
                        src={newProfilePicture ? newProfilePicture : user.image}
                      />
                      <AvatarFallback>
                        {user?.name.substring(0, 1).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Label>
                  <input
                    type="file"
                    id="photo-profile"
                    name="photo-profile"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      let { files } = e.target;
                      let reader = new FileReader();
                      reader.onload = async (e: any) => {
                        resizeBase64Img(e.target.result, 96, 96).then(
                          (img: string) => {
                            setNewProfilePicture(img);
                          }
                        );
                      };

                      if (files) reader.readAsDataURL(files[0]);
                    }}
                  />
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
              )}
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
