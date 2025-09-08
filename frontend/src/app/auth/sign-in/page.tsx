import { SignInForm } from "@/features/auth/ui/sign-in-form";
import React from "react";

const page = () => {
  return (
    <main className="max-w-desktop mx-auto flex justify-center items-center h-svh">
      <SignInForm />
    </main>
  );
};

export default page;
