"use client";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import api from "@/lib/axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth, User } from "./auth-context";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

type SearchContextProviderProps = {
  children: ReactNode;
};

type SearchContextData = {
  troggleSearch: () => void;
};

export const SearchContextProvider = ({
  children,
}: SearchContextProviderProps) => {
  const { toast } = useToast();
  const { token, apiUrl, user } = useAuth();

  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [users, setUsers] = useState<Array<User>>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput) {
        api
          .get(`${apiUrl}/account/find?q=${searchInput}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((result) => {
            setUsers(result.data);
          })
          .catch((error) => {
            toast({
              title: "Error",
              description: `There was an error when we tried to find your results.`,
            });
            console.error(error);
          });
      }
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [searchInput]);

  const initiateChat = (newChatId: string) => {
    api
      .post(`${apiUrl}/message/initiate/${newChatId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        // ToDo: Update chat lists
        // ToDo: Open chat with newChatId
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: `There was an error when we tried to find your results.`,
        });
        console.error(error);
      });
  };

  return (
    <SearchContext.Provider
      value={
        {
          troggleSearch: () => setShowSearch(!showSearch),
        } as SearchContextData
      }
    >
      {children}
      <CommandDialog
        open={showSearch}
        onOpenChange={(value) => setShowSearch(value)}
      >
        <Command className="rounded-lg border shadow-md">
          <Input
            placeholder="Type an e-mail or nickname"
            value={searchInput}
            onChange={(e: any) => setSearchInput(e.target.value)}
            className="border-none"
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {users &&
                users.map((user) => (
                  <CommandItem
                    onSelect={() => {
                      initiateChat(user.id);
                      setShowSearch(false);
                    }}
                  >
                    <Avatar className="mr-2 h-4 w-4">
                      <AvatarImage src={`${user?.image}`} />
                      <AvatarFallback>
                        {user?.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span>{user?.email}</span>
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  return useContext(SearchContext);
};

const SearchContext = createContext<SearchContextData>({} as SearchContextData);
