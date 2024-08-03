import type { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import api from "@/lib/axios";
import { cookies } from "next/headers";
import axios from "axios";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "your-cool-email",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "your-strong-password",
        },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const res = await api.post(`${process.env.API_URL}/auth/login`,
          {
            email: credentials.email,
            password: credentials.password
          }
        )

        const token = (await res).data.token;
        api.defaults.headers.common['Authorization'] = token;

        const result = (await axios.get(process.env.API_URL + '/account/info', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })).data;

        const user: User = {
          id: result.id,
          name: `${result.name} ${result.surname}`,
          email: result.email
        }

        cookies().set('token', token);

        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user: { name, email, image }, account }) {
      if (account?.provider != "credentials") {
        // See if the e-mail is registered
      } else {

      }

      return true;
    },
  },
};
