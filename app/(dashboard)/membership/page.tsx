"use client"
import MembershipTable from "@/components/tables/MembershipTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HandCoinsIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const Page = () => {
  
  return (
    <div className="">
      <div className="mb-4 flex flex-col items-center justify-between lg:flex-row">
        <div className="flex items-center gap-x-2.5">
          <HandCoinsIcon color="red" size={25} />

          <span className="text-[20px] font-bold">Membership</span>
        </div>
        <div className="flex items-center gap-x-2.5">
          <Link
            href="/membership/add"
            className="flex h-10 w-auto items-center rounded-[10px] px-3 gap-2 bg-primary text-white"
          >
            <PlusIcon size={20} />
            Add Membership
          </Link>
        </div>
      </div>
      <div className="flex justify-start">
        <Input
          className="transition3 focus:border-gray-500 mx-auto hidden h-10 rounded-lg bg-gray lg:block lg:w-72"
          placeholder="Search anything..."
        />
      </div>
      <MembershipTable />
    </div>
  );
};

export default Page;
