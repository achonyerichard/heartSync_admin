"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CategoryTable from "../../../components/tables/CategoryTable";
import { CassetteTapeIcon, HandCoinsIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import React, { useRef, useState } from "react";
import AddModal from "@/components/molecules/Modals/CategoryModal/AddCategoryModal";
import Modal from "@/components/molecules/Modals/ModalBackground";
import { useFetch, useMutate } from "@/hooks/useHttpRequest";
import { Flip, toast } from "react-toastify";
import { Skeleton } from "@/components/ui/skeleton";

const Page = () => {
  const typeRef = useRef<"add" | "update">("add");
  const [open, setOpen] = useState(false);
  const { mutate, isLoading: buttonLoading } = useMutate(
    "post",
    "/category/create",
    (data) => {
      toast.success(data?.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip,
      });
      setTimeout(() => {
        setOpen(false);
        refetch()
      }, 1000);
    },
    undefined,
    (err: any) => {
      toast.error(err.response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip,
      });
    },
  );

  const { data, isLoading, refetch } = useFetch(
    "get",
    "category/fetch",
    (data) => {},
    undefined,
  );

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
            className="flex h-10 w-auto items-center gap-2 rounded-[10px] bg-primary px-3 text-white"
          >
            <PlusIcon size={20} />
            Add Category
          </Button>
        </div>
      </div>
      <div className="flex justify-start">
        <Input
          className="transition3 mx-auto hidden h-10 rounded-lg border-gray bg-gray lg:block lg:w-72"
          placeholder="Search anything..."
        />
      </div>

      {isLoading ? (
        <div className="flex flex-col  mt-5 [&>*:nth-child(odd)]:bg-lightpink [&>*:nth-child(even)]:bg-gray">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      ) : (
        <CategoryTable data={data}  refetch={refetch} />
      )}
      <Modal open={open} setOpen={() => setOpen(false)}>
        <AddModal
          type={typeRef.current}
          setOpen={() => setOpen(false)}
          loading={buttonLoading}
        
          mutate={mutate}
        />
      </Modal>
    </div>
  );
};

export default Page;
