"use client";
import "./globals.css";
import localFont from "@next/font/local";
import Wrapper from "./wrapper";
import { setHttpHeaders } from "@/lib/setHeaders";
import { useEffect } from "react";
import { getCookie } from "cookies-next";

const urbanist = localFont({
  src: [
    {
      path: "../public/fonts/Urbanist/Urbanist-Thin.ttf",
      weight: "100",
    },
    {
      path: "../public/fonts/Urbanist/Urbanist-ExtraLight.ttf",
      weight: "200",
    },
    {
      path: "../public/fonts/Urbanist/Urbanist-Light.ttf",
      weight: "300",
    },
    {
      path: "../public/fonts/Urbanist/Urbanist-Regular.ttf",
      weight: "400",
    },
    {
      path: "../public/fonts/Urbanist/Urbanist-Medium.ttf",
      weight: "500",
    },
    {
      path: "../public/fonts/Urbanist/Urbanist-SemiBold.ttf",
      weight: "600",
    },
    {
      path: "../public/fonts/Urbanist/Urbanist-Bold.ttf",
      weight: "700",
    },
    {
      path: "../public/fonts/Urbanist/Urbanist-ExtraBold.ttf",
      weight: "800",
    },
    {
      path: "../public/fonts/Urbanist/Urbanist-Black.ttf",
      weight: "900",
    },
  ],
  variable: "--font-urbanist",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  useEffect(() => {
    const cookie = getCookie("token")!;
    setHttpHeaders(cookie);
  }, []);

  return (
    <html lang="en">
      <body className={`${urbanist.variable} overflow-hidden`}>
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  );
}
