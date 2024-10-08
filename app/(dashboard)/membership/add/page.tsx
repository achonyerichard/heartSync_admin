import CreateMembershipForm from "@/components/organisms/Membership/CreateMembershipForm";
import { HandCoinsIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div>
      <div className="mb-4 flex flex-col items-center justify-between lg:flex-row">
        <div className="flex items-center gap-x-2.5">
          <HandCoinsIcon color="red" size={25} />

          <span className="text-[20px] font-bold">Add Membership</span>
        </div>
        <div className="flex items-center gap-x-2.5">
          <Link href="/membership">Membership</Link>
          <span>&gt;</span>
          <p className="text-lightgray">Create</p>
        </div>
      
      </div>
      <CreateMembershipForm/>
    </div>
  );
};

export default Page;
