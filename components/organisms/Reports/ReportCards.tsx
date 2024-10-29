"use client";
import { CustomCard } from "@/components/atoms/CustomCard/CustomCard";
import { Reports } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import ReactPaginate from "react-paginate";
import EmptyState from "../EmptyState/EmptyState";
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

const ReportCards = ({
  data,
  refetch,
  pageCount,
  setCurrentPage,
  itemsPerPage,
  currentPage,
}: {
  data: any;
  refetch: any;
  pageCount: any;
  setCurrentPage: any;
  itemsPerPage: any;
  currentPage: any;
}) => {
  const reports = useMemo(() => {
    if (!data?.data) {
      return;
    }
    return data?.data;
  }, [data?.data]);
  console.log("reports", reports);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected); // React Paginate provides 0-based page index
  };
  return (
    <>
      {reports?.length > 0 ? (
        <div>
          <div className="grid gap-4 lg:grid-cols-1">
            {reports?.map(
              (item: {
                _id?: any;
                id?: any;
                reason?: any;
                createdAt?: any;
                status?: any;
                reporter?: any;
                reported?: any;
              }) => {
                const { reporter, reported } = item;
                return (
                  <Link href={`reports/${item?._id}`} key={item.id}>
                    <CustomCard className="transition3 flex cursor-pointer items-start justify-between border border-gray hover:scale-[1.01]">
                      <div className="mb-2 flex flex-col items-start gap-y-2 xl:mb-4">
                        <div className="flex items-center gap-x-2">
                          <Image
                            src={reporter?.profilePicture}
                            width={200}
                            height={200}
                            className="shrink-none h-auto w-20 rounded-full max-xl:mb-2 max-xl:object-cover xl:h-12 xl:w-12 xl:rounded-full"
                            alt=""
                          />
                          <p className="text-sm font-semibold xl:text-base">
                            From: {reporter?.nickname}
                          </p>
                        </div>

                        <div className="flex flex-col gap-y-2">
                          <p className="text-sm font-semibold xl:text-base">
                            Report Issue: {item?.reason}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-start gap-y-2">
                        <p className="text-sm font-semibold text-lightgray">
                          {item?.createdAt}
                        </p>
                        <div className="flex items-center gap-2">
                          <span
                            className={`h-2 w-2 rounded-full ${item?.status === "Resolved" ? "bg-green-500" : "bg-primary"}`}
                          ></span>
                          <p className="text-sm font-semibold text-black xl:text-base">
                            {item?.status}
                          </p>
                        </div>
                      </div>
                    </CustomCard>
                  </Link>
                );
              },
            )}
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
      ) : (
        <EmptyState text={"Reports"} />
      )}
    </>
  );
};

export default ReportCards;
