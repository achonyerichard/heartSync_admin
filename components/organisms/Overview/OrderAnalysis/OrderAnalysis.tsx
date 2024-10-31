"use client";
import React, { useState } from "react";
import CustomTitle from "@/components/atoms/CustomTitle/CustomTitle";
import { CustomCard } from "@/components/atoms/CustomCard/CustomCard";
import { useFetch } from "@/hooks/useHttpRequest";

const OrderCard = ({
  title,
  amount,
  day,
}: {
  title: string;
  amount: number;
  day: string;
}) => {
  return (
    <CustomCard className="mb-3.5">
      <p className="mb-2 text-sm font-medium text-[#8A8686] capitalize">{title}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <div className="rounded-lg bg-[#F75555] p-2.5">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.25 6.875V5.625C6.25 4.63044 6.64509 3.67661 7.34835 2.97335C8.05161 2.27009 9.00544 1.875 10 1.875V1.875C10.9946 1.875 11.9484 2.27009 12.6517 2.97335C13.3549 3.67661 13.75 4.63044 13.75 5.625V6.875M3.125 6.875C2.95924 6.875 2.80027 6.94085 2.68306 7.05806C2.56585 7.17527 2.5 7.33424 2.5 7.5V15.9375C2.5 17.1187 3.50625 18.125 4.6875 18.125H15.3125C16.4937 18.125 17.5 17.1676 17.5 15.9863V7.5C17.5 7.33424 17.4342 7.17527 17.3169 7.05806C17.1997 6.94085 17.0408 6.875 16.875 6.875H3.125Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.25 8.75V9.375C6.25 10.3696 6.64509 11.3234 7.34835 12.0267C8.05161 12.7299 9.00544 13.125 10 13.125C10.9946 13.125 11.9484 12.7299 12.6517 12.0267C13.3549 11.3234 13.75 10.3696 13.75 9.375V8.75"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="font-urbanist text-2xl font-semibold">{amount}</p>
        </div>
        <div>
          {" "}
          <p className="mb-2 text-sm text-[#8A8686]">{day}</p>
        </div>
      </div>
    </CustomCard>
  );
};

const OrderAnalysis = () => {
  const [data, setData] = useState<{ count: number; status: string }[]>([]);

  const { } = useFetch(
    "fetch-orders-count",
    "orders/getOrderStatusCount",
    (data) => {
      setData(data.data.data);
    },
  );
  return (
    <div className="col-span-2">
      {" "}
      <CustomTitle title="Order Analysis">
        <svg
          width="28"
          height="30"
          viewBox="0 0 28 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 xl:h-8 xl:w-8"
        >
          <path
            d="M26.2 6.83015L15.2 0.8089C14.8324 0.60658 14.4196 0.500488 14 0.500488C13.5804 0.500488 13.1676 0.60658 12.8 0.8089L1.8 6.83015C1.4064 7.04551 1.078 7.36283 0.849271 7.74881C0.620538 8.1348 0.499896 8.57523 0.5 9.0239V20.9764C0.499896 21.4251 0.620538 21.8655 0.849271 22.2515C1.078 22.6375 1.4064 22.9548 1.8 23.1701L12.8 29.1914C13.1675 29.3939 13.5804 29.5002 14 29.5002C14.4196 29.5002 14.8325 29.3939 15.2 29.1914L26.2 23.1701C26.5936 22.9548 26.922 22.6375 27.1507 22.2515C27.3795 21.8655 27.5001 21.4251 27.5 20.9764V9.0239C27.5001 8.57523 27.3795 8.1348 27.1507 7.74881C26.922 7.36283 26.5936 7.04551 26.2 6.83015ZM14 3.5714L23 8.50015L20.3213 9.9664L11.3212 5.0389L14 3.5714ZM14 13.4251L5 8.50015L8.195 6.75015L17.195 11.6764L14 13.4251ZM3.5 11.0989L12.5 16.0239V25.6076L3.5 20.6801V11.0989ZM15.5 25.6076V16.0239L18.5 14.3826V18.0001C18.5 18.398 18.658 18.7795 18.9393 19.0608C19.2206 19.3421 19.6022 19.5001 20 19.5001C20.3978 19.5001 20.7794 19.3421 21.0607 19.0608C21.342 18.7795 21.5 18.398 21.5 18.0001V12.7401L24.5 11.0989V20.6801L15.5 25.6076Z"
            fill="#F75555"
          />
        </svg>
      </CustomTitle>
      {data.map((order, index) => (
        <div key={index}>
          {" "}
          <OrderCard title={`${order.status} Orders`} amount={order.count} day="" />
        </div>
      ))}
    </div>
  );
};

export default OrderAnalysis;
