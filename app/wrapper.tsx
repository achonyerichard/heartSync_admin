"use client";
import React from "react";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { Toaster } from "@/components/ui/sonner";
import { UtilProvider } from "@/context/UtilityContext";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "@/context/AuthContext";


const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {" "}
      <ToastContainer />
      <AuthProvider>
        <UtilProvider>
          <Toaster />
          <Theme>{children}</Theme>
        </UtilProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default Wrapper;
