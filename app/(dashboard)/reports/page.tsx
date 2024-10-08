"use client";

import ReportCards from "@/components/organisms/Reports/ReportCards";
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
            height="33"
            viewBox="0 0 32 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.5 11C13.5 10.6044 13.6173 10.2178 13.8371 9.88886C14.0568 9.55996 14.3692 9.30362 14.7346 9.15224C15.1001 9.00087 15.5022 8.96126 15.8902 9.03843C16.2781 9.1156 16.6345 9.30608 16.9142 9.58579C17.1939 9.86549 17.3844 10.2219 17.4616 10.6098C17.5387 10.9978 17.4991 11.3999 17.3478 11.7654C17.1964 12.1308 16.94 12.4432 16.6111 12.6629C16.2822 12.8827 15.8956 13 15.5 13C14.9696 13 14.4609 12.7893 14.0858 12.4142C13.7107 12.0391 13.5 11.5304 13.5 11ZM29.5 16.5C29.5 19.17 28.7082 21.7801 27.2248 24.0002C25.7414 26.2203 23.633 27.9506 21.1662 28.9724C18.6994 29.9942 15.985 30.2615 13.3663 29.7406C10.7475 29.2197 8.34207 27.934 6.45406 26.0459C4.56606 24.1579 3.28031 21.7525 2.7594 19.1337C2.2385 16.515 2.50585 13.8006 3.52763 11.3338C4.54942 8.86697 6.27974 6.75856 8.49981 5.27516C10.7199 3.79176 13.33 3 16 3C19.5792 3.00397 23.0107 4.42756 25.5416 6.95844C28.0724 9.48932 29.496 12.9208 29.5 16.5ZM26.5 16.5C26.5 14.4233 25.8842 12.3932 24.7304 10.6665C23.5767 8.9398 21.9368 7.59399 20.0182 6.79926C18.0996 6.00454 15.9884 5.79661 13.9516 6.20175C11.9148 6.6069 10.0438 7.60693 8.57538 9.07538C7.10693 10.5438 6.10691 12.4148 5.70176 14.4516C5.29662 16.4884 5.50455 18.5996 6.29927 20.5182C7.09399 22.4368 8.4398 24.0767 10.1665 25.2304C11.8932 26.3842 13.9233 27 16 27C18.7839 26.997 21.4529 25.8898 23.4213 23.9213C25.3898 21.9528 26.497 19.2839 26.5 16.5ZM17.5 21.085V17C17.5 16.337 17.2366 15.7011 16.7678 15.2322C16.2989 14.7634 15.663 14.5 15 14.5C14.6458 14.4995 14.3028 14.6243 14.0318 14.8525C13.7608 15.0806 13.5792 15.3973 13.5194 15.7464C13.4595 16.0956 13.5251 16.4546 13.7046 16.76C13.8841 17.0654 14.1658 17.2974 14.5 17.415V21.5C14.5 22.163 14.7634 22.7989 15.2322 23.2678C15.7011 23.7366 16.337 24 17 24C17.3542 24.0005 17.6972 23.8757 17.9682 23.6475C18.2392 23.4194 18.4208 23.1027 18.4806 22.7536C18.5405 22.4044 18.4749 22.0454 18.2954 21.74C18.116 21.4346 17.8342 21.2026 17.5 21.085Z"
              fill="#F75555"
            />
          </svg>

          <span className="text-[20px] font-bold">All Reports</span>
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
              <SelectItem value="light">Subscribed</SelectItem>
              <SelectItem value="dark">Not Subscribed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <ReportCards />
    </div>
  );
};

export default Page;
