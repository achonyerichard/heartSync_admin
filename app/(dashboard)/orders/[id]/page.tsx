"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import React, { useRef, useState } from "react";
import { Calendar } from "lucide-react";

import { useRouter } from "next/navigation";

import Modal from "@/components/molecules/Modals/ModalBackground";

import ConfirmModal from "@/components/molecules/Modals/DeleteModal/ConfirmationModal";
const data = {
  id: 1,
  sentBy: "John Doe",
  product: "Laptop",
  orderId: "ORD123456",
  date: "2024-09-28",
  status: "Shipped",
  amount: 1200.5,
};
const SingleOrder = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const [open, setOpen] = useState(false);
  const typeRef = useRef<"delete" | "update">("delete");
  return (
    <section className="">
      <div className="mb-4 flex flex-col items-center justify-between lg:flex-row">
        <div className="flex items-center gap-x-2">
          <svg
            onClick={() => router.back()}
            className="cursor-pointer"
            width="32"
            height="33"
            viewBox="0 0 32 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.0613 25.4388C21.3431 25.7205 21.5014 26.1027 21.5014 26.5013C21.5014 26.8998 21.3431 27.282 21.0613 27.5638C20.7795 27.8455 20.3973 28.0039 19.9988 28.0039C19.6003 28.0039 19.2181 27.8455 18.9363 27.5638L8.9363 17.5638C8.79646 17.4244 8.6855 17.2588 8.6098 17.0765C8.53409 16.8942 8.49512 16.6987 8.49512 16.5013C8.49512 16.3038 8.53409 16.1084 8.6098 15.926C8.6855 15.7437 8.79646 15.5781 8.9363 15.4388L18.9363 5.43875C19.2181 5.15696 19.6003 4.99865 19.9988 4.99865C20.3973 4.99865 20.7795 5.15696 21.0613 5.43875C21.3431 5.72054 21.5014 6.10274 21.5014 6.50125C21.5014 6.89977 21.3431 7.28196 21.0613 7.56375L12.125 16.5L21.0613 25.4388Z"
              fill="black"
            />
          </svg>
          <div className="flex items-center gap-x-2.5">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30.7688 16.6475L18.3538 4.23251C18.1223 3.99951 17.8469 3.81479 17.5435 3.68905C17.24 3.56331 16.9147 3.49905 16.5863 3.50001H5.00001C4.60219 3.50001 4.22066 3.65805 3.93935 3.93935C3.65805 4.22066 3.50001 4.60219 3.50001 5.00001V16.5863C3.49905 16.9147 3.56331 17.24 3.68905 17.5435C3.81479 17.8469 3.99951 18.1223 4.23251 18.3538L16.6475 30.7688C17.1163 31.2374 17.7521 31.5007 18.415 31.5007C19.0779 31.5007 19.7137 31.2374 20.1825 30.7688L30.7688 20.1825C31.2374 19.7137 31.5007 19.0779 31.5007 18.415C31.5007 17.7521 31.2374 17.1163 30.7688 16.6475ZM18.415 28.2938L6.50001 16.375V6.50001H16.375L28.29 18.415L18.415 28.2938ZM13 11C13 11.3956 12.8827 11.7823 12.6629 12.1112C12.4432 12.44 12.1308 12.6964 11.7654 12.8478C11.3999 12.9991 10.9978 13.0388 10.6098 12.9616C10.2219 12.8844 9.8655 12.6939 9.5858 12.4142C9.30609 12.1345 9.11561 11.7782 9.03844 11.3902C8.96127 11.0022 9.00088 10.6001 9.15225 10.2346C9.30363 9.86919 9.55997 9.55683 9.88887 9.33707C10.2178 9.11731 10.6044 9.00001 11 9.00001C11.5304 9.00001 12.0392 9.21072 12.4142 9.5858C12.7893 9.96087 13 10.4696 13 11Z"
                fill="#F75555"
              />
            </svg>

            <span className="text-[20px] font-bold">Order Details</span>
          </div>
        </div>
      </div>
      <div className="mb-4 flex flex-col items-center justify-between lg:flex-row">
        <div className="flex items-center gap-x-4">
          <span className="flex items-center gap-x-1 [&>*:nth-child(even)]:font-bold">
            <p>Order Id:</p>
            <p>{data.orderId}</p>
          </span>
          <span className="flex items-center gap-x-2 [&>*:nth-child(even)]:font-bold">
            <Calendar size={20} />
            <p>{data.date}</p>
          </span>
          <Button
            variant="outline"
            className="flex h-10 w-auto items-center gap-2 rounded-none border-none bg-green-500 text-white"
            disabled
          >
            {data.status}
          </Button>
        </div>
        <Select
          onValueChange={(value: string) => {
            console.log("Val", value);
            setValue(value);
          }}
        >
          <SelectTrigger className="w-auto rounded-[16px] border-none bg-gray">
            <SelectValue placeholder="Order Status" />
          </SelectTrigger>
          <SelectContent className="border-none bg-gray">
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Modal open={value.length > 0} setOpen={() => setValue("")}>
        <ConfirmModal
          type={typeRef.current}
          close={() => setOpen(false)}
          handleConfirm={() => {}}
          text={`${value === "delivered" ? "Confirm this order has been delivered!! " : "Confirm this order is on it's way to be shipped"}`}
        />
      </Modal>
    </section>
  );
};

export default SingleOrder;
