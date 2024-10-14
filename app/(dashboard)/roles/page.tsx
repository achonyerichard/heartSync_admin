"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RolesTable from "../../../components/tables/RolesTable";
import { CassetteTapeIcon, HandCoinsIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import React, { useRef, useState } from "react";
import AddModal from "@/components/molecules/Modals/AddAdminModal/AddAdmin";
import Modal from "@/components/molecules/Modals/ModalBackground";

const Page = () => {
  const typeRef = useRef<"add" | "update">("add");
  const [open, setOpen] = useState(false);
  return (
    <div className="">
      <div className="mb-4 flex flex-col items-center justify-between lg:flex-row">
        <div className="flex items-center gap-x-2.5">
          <CassetteTapeIcon color="red" size={25} />

          <span className="text-[20px] font-bold">Roles</span>
        </div>
      </div>
      <div className="flex justify-between">
        <Input
          className="transition3 focus:border-gray-500 hidden h-10 rounded-lg bg-gray lg:block lg:w-72"
          placeholder="Name..."
        />
        
        <div className="flex items-center gap-x-2.5">
          <Button
            onClick={() => {
              setOpen(true);
              typeRef.current = "add";
            }}
            className="flex h-10 w-auto items-center gap-2 rounded-[10px] bg-primary px-3 text-white"
          >
            <PlusIcon size={20} />
            Add Admin
          </Button>
        </div>
      </div>

      <RolesTable />
      <Modal open={open} setOpen={() => setOpen(false)}>
        <AddModal type={typeRef.current} setOpen={() => setOpen(false)} />
      </Modal>
    </div>
  );
};

export default Page;
