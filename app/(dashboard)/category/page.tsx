"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CategoryTable from '../../../components/tables/CategoryTable'
import { CassetteTapeIcon, HandCoinsIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import React, { useRef, useState } from "react";
import AddModal from "@/components/molecules/Modals/AddCategoryModal/AddCategoryModal";
import Modal from "@/components/molecules/Modals/ModalBackground";

const Page = () => {
  const typeRef = useRef<"add" | "update">("add");
  const [open, setOpen] = useState(false);
  return (
    <div className="">
      <div className="mb-4 flex flex-col items-center justify-between lg:flex-row">
        <div className="flex items-center gap-x-2.5">
          <CassetteTapeIcon color="red" size={25} />

          <span className="text-[20px] font-bold">Category</span>
        </div>
        <div className="flex items-center gap-x-2.5">
          <Button
           onClick={() => {
            setOpen(true);
            typeRef.current = "add";
          }}
            className="flex h-10 w-auto items-center rounded-[10px] px-3 gap-2 bg-primary text-white"
          >
            <PlusIcon size={20} />
            Add Category
          </Button>
        </div>
      </div>
      <div className="flex justify-start">
        <Input
          className="transition3 focus:border-gray-500 mx-auto hidden h-10 rounded-lg bg-gray lg:block lg:w-72"
          placeholder="Search anything..."
        />
      </div>
      <CategoryTable />
      <Modal open={open} setOpen={() => setOpen(false)}>
        <AddModal type={typeRef.current} setOpen={() => setOpen(false)} />
      </Modal>
    </div>
  );
};

export default Page;
