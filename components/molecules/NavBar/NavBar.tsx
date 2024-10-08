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
    <div className="sticky  top-0 z-10 flex h-16 items-center justify-between bg-white px-3 shadow-lg xl:h-[88px] xl:px-9">
      <h2
        className="hidden text-[28px] font-bold text-primary xl:block"
        onClick={() => setOpen(true)}
      >
        Dashboard
      </h2>
      <Image
        src={logo}
        alt=""
        className="block h-10 w-10 xl:hidden xl:h-auto xl:w-auto"  onClick={() => setOpen(true)}
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
