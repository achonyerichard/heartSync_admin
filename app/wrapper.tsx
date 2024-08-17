"use client";
import React from "react";
import { Theme } from "@radix-ui/themes";
import { Toaster } from "@/components/ui/sonner";import '@radix-ui/themes/styles.css';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Theme>{children}</Theme>
    </QueryClientProvider>
  );
};

export default Wrapper;
