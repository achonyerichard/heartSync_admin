"use client";
import { CustomCard } from "@/components/atoms/CustomCard/CustomCard";
import { Reports } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
export const items: Reports[] = [
  {
    id: 1,
    name: "Charlotte Adams",
    reason: "Inappropriate Content",

    date: "1990-01-01",
    status: "Resolved",
    img: "/images/sender.png",
  },
  {
    id: 1,
    name: "John Doe",
    reason: "Inappropriate Content",
    img: "/images/receiver.png",
    date: "1990-01-01",
    status: "Resolved",
  },
  {
    id: 1,
    name: "Charlotte Adams",
    reason: "Inappropriate Content",

    date: "1990-01-01",
    status: "Resolved",
    img: "/images/sender.png",
  },
  {
    id: 1,
    name: "John Doe",
    reason: "Inappropriate Content",
    img: "/images/receiver.png",
    date: "1990-01-01",
    status: "Resolved",
  },
  {
    id: 1,
    name: "Charlotte Adams",
    reason: "Inappropriate Content",

    date: "1990-01-01",
    status: "Resolved",
    img: "/images/sender.png",
  },
  {
    id: 1,
    name: "John Doe",
    reason: "Inappropriate Content",
    img: "/images/receiver.png",
    date: "1990-01-01",
    status: "Resolved",
  },
  {
    id: 1,
    name: "Charlotte Adams",
    reason: "Inappropriate Content",

    date: "1990-01-01",
    status: "Resolved",
    img: "/images/sender.png",
  },
  {
    id: 1,
    name: "John Doe",
    reason: "Inappropriate Content",
    img: "/images/receiver.png",
    date: "1990-01-01",
    status: "Resolved",
  },
];

const ReportCards = () => {
  let itemsPerPage = 4;
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: { selected: any }) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`,
    );
    setItemOffset(newOffset);
  };
  return (
    <div>
      <div className="grid gap-4 lg:grid-cols-1">
        {currentItems.map((item) => (
          <Link href={`reports/${item.id}`} key={item.id}>
            <CustomCard className="transition3 flex cursor-pointer items-start justify-between border border-gray hover:scale-[1.01]">
              <div className="mb-2 flex flex-col items-start gap-y-2 xl:mb-4">
                <div className="flex items-center gap-x-2">
                  <Image
                    src={item.img}
                    width={200}
                    height={200}
                    className="shrink-none h-auto w-20 rounded-full max-xl:mb-2 max-xl:object-cover xl:h-12 xl:w-12 xl:rounded-full"
                    alt=""
                  />
                  <p className="text-sm font-semibold xl:text-base">
                    From: {item.name}
                  </p>
                </div>

                <div className="flex flex-col gap-y-2">
                  <p className="text-sm font-semibold xl:text-base">
                    Report Issue: {item.reason}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start gap-y-2">
                <p className="text-sm font-semibold text-lightgray">
                  {item.date}
                </p>
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${item.status === "Resolved" ? "bg-green-500" : "bg-primary"}`}
                  ></span>
                  <p className="text-sm font-semibold text-black xl:text-base">
                    {item.status}
                  </p>
                </div>
              </div>
            </CustomCard>
          </Link>
        ))}
      </div>
      <ReactPaginate
        breakLabel="....."
        nextLabel="Next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        pageCount={pageCount}
        previousLabel="< Previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="previous-item"
        previousLinkClassName="previous-link"
        nextClassName="next-item"
        nextLinkClassName="next-link"
        breakClassName="break-item"
        breakLinkClassName="break-link"
        activeClassName="active"
      />
    </div>
  );
};

export default ReportCards;
