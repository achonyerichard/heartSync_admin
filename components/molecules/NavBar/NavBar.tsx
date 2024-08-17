"use client";
import React from "react";
import Image from "next/image";
import profile from "@/public/images/icons/user_profile.svg";
import { Input } from "@/components/ui/input";

const NavBar = () => {
  return (
    <div className="sticky top-0 z-10 flex h-[88px] items-center justify-between bg-white px-9 shadow-lg">
      <h2 className="text-[28px] font-bold text-primary">Dashboard</h2>
      <Input
        className="transition3 mx-auto h-10 w-9/12 bg-gray-50 focus:border-gray-500 rounded-lg"
        placeholder="Search anything..."
      />
      <Image
        src={profile}
        alt=""
        className="h-11 w-11 rounded-full object-cover"
      />
    </div>
  );
};

export default NavBar;
