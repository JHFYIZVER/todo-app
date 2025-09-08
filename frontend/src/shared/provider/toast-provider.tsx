"use client";

import { Toaster } from "../ui/sonner";

export function ToastProvider() {
  return <Toaster position="top-right" duration={3000} />;
}
