"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { signOut } from "next-auth/react";

const signOutPage = () => {
  const handleSignOut = () => {
    axios.delete(`/api/token`).then((result) => {
      signOut({ callbackUrl: "/auth/signin" });
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="m-auto h-28 w-96 flex flex-col align-middle gap-2">
        <div className="mx-auto">Are you sure that you want to sign out?</div>
        <Button onClick={handleSignOut}>Sign out</Button>
      </div>
    </div>
  );
};

export default signOutPage;
