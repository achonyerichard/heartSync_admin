"use client";
import OrdersTable from "@/components/tables/OrdersTable";
import UsersTables from "@/components/tables/UsersTables";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "lucide-react";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Page = () => {
  const [dateRange, setDateRange] = useState<any>([null, null]);
  const [startDate, endDate] = dateRange;
  return (
    <div className="">
      <div className="mb-4 flex flex-col items-center justify-between lg:flex-row">
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

          <span className="text-[20px] font-bold">Orders</span>
        </div>

        <div className="flex items-center gap-x-2.5">
          <DatePicker
            showIcon
            className="text-gray-700 cursor-pointer rounded-[16px] bg-white px-4 py-2 shadow-lg placeholder:pl-2 placeholder:text-sm placeholder:text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
              setDateRange(update);
            }}
            icon={<Calendar />}
            placeholderText="Select a Date Range"
            isClearable={true}
          />
          <Select>
            <SelectTrigger className="w-[116px] rounded-[16px] border-none bg-gray">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent className="border-none bg-gray">
              <SelectItem value="light">Delivered</SelectItem>
              <SelectItem value="dark">Shipped</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex justify-start">
        <Input
          className="transition3 border-gray mx-auto hidden h-10 rounded-lg bg-gray lg:block lg:w-80"
          placeholder="Search anything..."
        />
      </div>
      <OrdersTable />
    </div>
  );
};

export default Page;
