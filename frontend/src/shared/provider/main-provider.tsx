"use client";

import { type PropsWithChildren } from "react";

import { ToastProvider } from "./toast-provider";
import { EffectorProvider } from "./effector-provider";

export function MainProvider({ children }: PropsWithChildren<unknown>) {
  return (
    <EffectorProvider>
      {children}
      <ToastProvider />
    </EffectorProvider>
  );
}
