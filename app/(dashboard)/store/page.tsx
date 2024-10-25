"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CategoryTable from "../../../components/tables/CategoryTable";
import { CassetteTapeIcon, HandCoinsIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import React, { useRef, useState } from "react";

import Modal from "@/components/molecules/Modals/ModalBackground";
import { useFetch, useMutate } from "@/hooks/useHttpRequest";
import { Flip, toast } from "react-toastify";
import { Skeleton } from "@/components/ui/skeleton";
import AddModal from "@/components/molecules/Modals/StoreModal.tsx/AddStoreModal";
import StoreCards from "@/components/organisms/Store/StoreCards";

const Page = () => {
  const typeRef = useRef<"add" | "update">("add");
  const [open, setOpen] = useState(false);
  const { mutate, isLoading: buttonLoading } = useMutate(
    "post",
    "/stores/create",
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
        refetch();
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
    "stores/getStores",
    (data) => {},
    undefined,
  );

  return (
    <div className="">
      <div className="mb-4 flex flex-col items-center justify-between lg:flex-row">
        <div className="flex items-center gap-x-2.5">
          <CassetteTapeIcon color="red" size={25} />

          <span className="text-[20px] font-bold">Store</span>
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
            Add Store
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
        <div className="mt-5 grid lg:grid-cols-3 grid-cols-1 gap-4 [&>*:nth-child(even)]:bg-gray [&>*:nth-child(odd)]:bg-lightpink">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      ) : (
        <StoreCards data={data} refetch={refetch} />
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
