'use client';

import { User } from "next-auth";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import axios, { AxiosInstance } from 'axios';
import https from 'https';

const agent = new https.Agent({
  rejectUnauthorized: false
});

type AuthContextProps = {
  children: ReactNode;
  token?: string;
  baseUrl: string;
}

type AuthContextData = {
  user: User;
  token: string;
  apiUrl: string;
}

export const AuthContextProvider = ({ children, token, baseUrl }: AuthContextProps) => {
  return (
    <AuthContext.Provider value={{
      token: token,
      apiUrl: baseUrl
    } as AuthContextData}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext);
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);
