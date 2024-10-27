"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RolesTable from "../../../components/tables/RolesTable";
import { CassetteTapeIcon, HandCoinsIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import AddModal from "@/components/molecules/Modals/AddAdminModal/AddAdmin";
import Modal from "@/components/molecules/Modals/ModalBackground";
import { useFetch, usePaginatedFetch } from "@/hooks/useHttpRequest";
import { Spinner } from "@radix-ui/themes";
import { toast } from "react-toastify";

const Page = () => {
  let itemsPerPage = 1;
  const typeRef = useRef<"add" | "update">("add");
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const { isLoading, data, refetch } = usePaginatedFetch(
    "get",
    "admins/fetchAdmins",
    currentPage + 1, // Backend expects 1-based page index
    itemsPerPage,
    {
      dataKey: "admins", // If the data array is under `users`
      totalPagesKey: "totalPages", // If the total pages key is `totalUsersPages`
      totalItemsKey: "totalUsers", // If the total items key is `totalUsers`
      currentPageKey: "currentPage", // If current page is under `current`
    },
    (data: any) => console.log("Fetch success", data),
    () => toast.error("Failed to fetch admins"),
  );

  useEffect(() => {
    console.log(currentPage)
    refetch;
  }, [currentPage]);


  const pageCount = Math.ceil(data?.totalItems / itemsPerPage);
  return (
    <div className="">
      <div className="mb-4 flex flex-col items-center justify-between gap-y-2 lg:flex-row">
        <div className="flex items-center gap-x-2.5">
          <CassetteTapeIcon color="red" size={25} />

          <span className="text-[20px] font-bold">Roles</span>
        </div>
      </div>
      <div className="flex justify-between">
        <Input
          className="transition3 hidden h-10 rounded-lg border-gray bg-gray lg:block lg:w-72"
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

      {isLoading ? (
        <div className="flex justify-center">
          <Spinner size="2" />
        </div>
      ) : (
        <RolesTable
          data={data}
          refetch={refetch}
          pageCount={pageCount}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
        />
      )}
      <Modal open={open} setOpen={() => setOpen(false)}>
        <AddModal
          type={typeRef.current}
          setOpen={() => setOpen(false)}
          refetch={refetch}
        />
      </Modal>
    </div>
  );
};

export default Page;
