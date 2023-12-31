"use client";

import { FC } from "react";
import Link from "next/link";
import UserAuthForm from "./UserAuthForm";

const SignIn: FC = () => {
  return (
    <div className="container mx-auto w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        {/* <Icons.logo className="mx-auto h-6 w-6" /> */}
        <p className="font-black text-3xl">THREADIT</p>
        <h1 className="text-2xl font-semibold tracking-tight">Welcome!</h1>
        <p className="text-sm max-w-xs mx-auto">
          By continuing, you are setting up a Threadit account and agree to our
          User Agreement and Privacy Policy
        </p>

        {/* sign in form */}
        <UserAuthForm />
      </div>
    </div>
  );
};

export default SignIn;
