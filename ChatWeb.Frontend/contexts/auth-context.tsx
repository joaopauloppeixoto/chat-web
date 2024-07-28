'use client';

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
      user: user
    } as AuthContextData}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext);
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);
