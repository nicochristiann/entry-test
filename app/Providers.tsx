"use client";

import { Provider } from "react-redux";
import { store } from "@/state/store";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <Navbar />
      <Toaster position="top-right" richColors />
      {children}
    </Provider>
  );
}
