"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft } from "lucide-react";
import { FormEvent } from "react";

const signup = () => {
  const { toast } = useToast();

  const handleGoBackButton = () => {
    window.history.back();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password, repeatPassword } = e.target as HTMLFormElement;

    if (!email.value) {
      toast({
        title: "Email Address Required",
        type: "foreground",
        description: "It looks like you didn't enter an email address.",
      });
    }

    if (!password.value) {
      toast({
        title: "Password Required",
        type: "foreground",
        description: "It looks like you didn't enter a password.",
      });
    }

    if (password.value !== repeatPassword.value) {
      toast({
        title: "Passwords Don't Match",
        type: "foreground",
        description:
          "The passwords entered don't match. Please check and try again.",
      });
    }
  };

  return (
    <div className="flex flex-1 h-full">
      <div className="w-96 h-96 m-auto">
        <form
          className="flex flex-col gap-6 border rounded-md p-7 my-auto"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-row gap-3 items-center">
            <Button variant="outline" size="icon" onClick={handleGoBackButton}>
              <ArrowLeft />
            </Button>
            <h1 className="flex-1 text-xl">New user</h1>
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              // type="email"
              placeholder="Email"
              required
            />
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
          <div>
            <Label htmlFor="repeatPassword">Repeat password</Label>
            <Input
              name="repeatPassword"
              type="password"
              placeholder="Repeat password"
              required
            />
          </div>
          <Button>
            <input type="submit" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default signup;
