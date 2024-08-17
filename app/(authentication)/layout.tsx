"use client";
import React from "react";
import Image from "next/image";
import image from "@/public/images/auth_layout_image.webp";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center p-9 h-screen bg-white gap-x-11">
      <div className="w-5/12">{children}</div>
      <section className="w-7/12 h-full">
        <Image src={image} alt="auth_layout_image" className="w-full h-full object-cover rounded-3xl" />
      </section>
    </div>
  );
};

export default Layout;
