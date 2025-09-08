"use client";

import { type PropsWithChildren } from "react";
import { EffectorNext } from "@effector/next";

export function EffectorProvider({ children }: PropsWithChildren<unknown>) {
  return <EffectorNext>{children}</EffectorNext>;
}
