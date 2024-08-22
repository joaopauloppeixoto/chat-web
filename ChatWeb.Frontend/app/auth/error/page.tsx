"use client";

import { useSearchParams } from "next/navigation";
import SignIn from "../signin/page";

const page = () => {
  const params: URLSearchParams = useSearchParams();

  return <SignIn error={params.get("error")} />;
};

export default page;
