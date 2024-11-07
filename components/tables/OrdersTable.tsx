"use client";
import { useAuth } from "@/context/AuthContext";
import { Orders } from "@/interfaces";
import { AdminRole } from "@/lib/Constants";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import ReactPaginate from "react-paginate";
import EmptyState from "../organisms/EmptyState/EmptyState";

const OrdersTable = ({
  data,
  refetch,
  pageCount,
  setCurrentPage,
  itemsPerPage,
  currentPage,
  isMarketer,
}: {
  data: any;
  refetch: any;
  pageCount: any;
  setCurrentPage: any;
  itemsPerPage: any;
  currentPage: any;
  isMarketer: boolean;
}) => {
  const orders = useMemo(() => {
    if (!data?.data) {
      return;
    }
    return data?.data;
  }, [data?.data]);
  const { userRole } = useAuth();
  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected); // React Paginate provides 0-based page index
  };
  return (
    <>
      {orders?.length > 0 ? (
        <div>
          <div className="h-auto w-full overflow-auto bg-white shadow-xl">
            <table className="no-scrollbar w-full overflow-scroll leading-normal lg:overflow-hidden">
              <thead>
                <tr className="border-gray-400 border-b bg-white">
                  <th className="b px-5 py-3 text-left text-sm font-semibold capitalize tracking-wider text-black">
                    S/N
                  </th>

                  {!isMarketer && (
                    <th className="b px-5 py-3 text-left text-sm font-semibold capitalize tracking-wider text-black">
                      Sent By
                    </th>
                  )}
                  <th className="b px-5 py-3 text-left text-sm font-semibold capitalize tracking-wider text-black">
                    Product
                  </th>
                  {!isMarketer && (
                    <th className="b px-5 py-3 text-left text-sm font-semibold capitalize tracking-wider text-black">
                      Order Id
                    </th>
                  )}
                  {!isMarketer && (
                    <th className="b px-5 py-3 text-left text-sm font-semibold capitalize tracking-wider text-black">
                      Recipient
                    </th>
                  )}
                  <th className="b px-5 py-3 text-left text-sm font-semibold capitalize tracking-wider text-black">
                    Status
                  </th>
                  <th className="b px-5 py-3 text-left text-sm font-semibold capitalize tracking-wider text-black">
                    Amount
                  </th>
                  {AdminRole.MARKETER === userRole && (
                    <th className="b px-5 py-3 text-left text-sm font-semibold capitalize tracking-wider text-black">
                      Action
                    </th>
                  )}
                </tr>
              </thead>

              {data && (
                <tbody className="w-full text-black shadow-lg [&>*:nth-child(even)]:bg-white [&>*:nth-child(odd)]:bg-lightpink">
                  {orders?.map(
                    (
                      item: {
                        _id: React.Key | string;
                        product?: any;
                        id: React.Key | string;
                        senderProfile: {
                          nickname: string;
                        };
                        items: { product: { price: number; name: string } }[];
                        orderCustomId: string;

                        sentToProfile: {
                          nickname: string;
                        };
                        status: string;
                      },
                      index: number,
                    ) => {
                      return (
                        <tr key={isMarketer ? item._id : item?.id} className="">
                          <td className="px-5 py-3 text-sm">{index + 1}</td>
                          {!isMarketer && (
                            <td className="whitespace-no-wrap px-5 py-3 text-sm font-normal capitalize">
                              {item?.senderProfile?.nickname ?? "N/A"}
                            </td>
                          )}
                          <td className="whitespace-no-wrap px-5 py-3 text-sm font-normal capitalize">
                            {isMarketer
                              ? item?.product?.name
                              : ((item?.items &&
                                  item?.items[0]?.product?.name) ??
                                "N/A")}
                          </td>
                          {!isMarketer && (
                            <td className="whitespace-no-wrap px-5 py-3 text-sm font-normal capitalize">
                              {item?.orderCustomId ?? "N/A"}
                            </td>
                          )}
                          {!isMarketer && (
                            <td className="whitespace-no-wrap px-5 py-3 text-sm font-normal capitalize">
                              {item?.sentToProfile?.nickname}
                            </td>
                          )}
                          <td className="whitespace-no-wrap px-5 py-3 text-sm font-normal capitalize">
                            {item?.status}
                          </td>
                          <td className="whitespace-no-wrap px-5 py-3 text-sm font-normal capitalize">
                            {isMarketer
                              ? item?.product?.price
                              : ((item?.items &&
                                  item?.items[0]?.product?.price) ??
                                "N/A")}
                          </td>

                          <td className="flex items-center px-5 py-3 text-sm">
                            {AdminRole.MARKETER === userRole && (
                              <Link
                                href={`/orders/${isMarketer ? item._id : item?.id}`}
                                className={`whitespace-no-wrap text-md text-Hwhite ml-3 cursor-pointer rounded-md p-2 font-semibold underline`}
                              >
                                View
                              </Link>
                            )}
                          </td>
                        </tr>
                      );
                    },
                  )}
                </tbody>
              )}
            </table>
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
        <EmptyState text={"Orders"} />
      )}
    </>
  );
};

export default OrdersTable;
