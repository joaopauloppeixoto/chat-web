"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, X } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { FormEvent } from "react";

type signUpProps = {
  error?: string | null;
};

const signup = ({ error }: signUpProps) => {
  const handleSignIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signIn("credentials", {
      email: (e.target as HTMLFormElement).email.value,
      password: (e.target as HTMLFormElement).password.value,
      callbackUrl: "/",
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="m-auto h-96 w-96 flex flex-col align-middle gap-2">
        <form
          className="flex flex-col gap-6 border rounded-md p-7 my-auto"
          onSubmit={handleSignIn}
        >
          <div className="flex flex-row gap-3 items-center">
            <h1 className="flex-1 text-xl">Login</h1>
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input name="email" type="email" placeholder="Email" required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <div className="flex flex-row gap-2">
            <Link href="new-user">
              <Button variant="outline" size="icon">
                <UserPlus />
              </Button>
            </Link>
            <Button type="submit" className="flex-1">
              <input type="submit" className=" cursor-pointer" />
            </Button>
          </div>
        </form>
        {error && (
          <Alert variant="default">
            <X />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default signup;
