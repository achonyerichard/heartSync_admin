"use client";
import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useUtilAuth } from "@/context/UtilityContext";
import profile from "@/public/images/icons/user_profile.svg";
import logo from "@/public/images/logo_2.png";

const NavBar = () => {
  const { setOpen } = useUtilAuth();
  return (
    <div className="sticky top-0 z-10 flex h-[88px] items-center justify-between bg-white px-9 shadow-lg">
      <h2 className="text-[28px] font-bold text-primary">Dashboard</h2>
      <Input
        className="transition3 mx-auto h-10 lg:w-9/12 bg-gray focus:border-gray-500 rounded-lg hidden lg:block"
        placeholder="Search anything..."
      />
      <Image
        src={profile}
        alt=""
        className="w-8 h-8 xl:h-11 xl:w-11 rounded-full object-cover"
      />
    </div>
  );
};

export default NavBar;
