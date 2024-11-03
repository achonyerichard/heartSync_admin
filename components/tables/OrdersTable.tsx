"use client";
import { Orders } from "@/interfaces";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import ReactPaginate from "react-paginate";

const OrdersTable = ({
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
  const orders = useMemo(() => {
    if (!data?.data) {
      return;
    }
    return data?.data;
  }, [data?.data]);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected); // React Paginate provides 0-based page index
  };
  return (
    <div>
      <div className="h-auto w-full overflow-auto bg-white shadow-xl">
        <table className="no-scrollbar w-full overflow-scroll leading-normal lg:overflow-hidden">
          <thead>
            <tr className="border-gray-400 border-b bg-white">
              <th className="b px-5 py-3 text-center text-sm font-semibold capitalize tracking-wider text-black">
                S/N
              </th>

              <th className="b px-5 py-3 text-center text-sm font-semibold capitalize tracking-wider text-black">
                Sent By
              </th>
              <th className="b px-5 py-3 text-center text-sm font-semibold capitalize tracking-wider text-black">
                Product
              </th>
              <th className="b px-5 py-3 text-center text-sm font-semibold capitalize tracking-wider text-black">
                Order Id
              </th>
              <th className="b px-5 py-3 text-center text-sm font-semibold capitalize tracking-wider text-black">
                Recipient
              </th>
              <th className="b px-5 py-3 text-center text-sm font-semibold capitalize tracking-wider text-black">
                Status
              </th>
              <th className="b px-5 py-3 text-center text-sm font-semibold capitalize tracking-wider text-black">
                Amount
              </th>
              <th className="b px-5 py-3 text-center text-sm font-semibold capitalize tracking-wider text-black">
                Action
              </th>
            </tr>
          </thead>

          {data && (
            <tbody className="w-full text-black shadow-lg [&>*:nth-child(even)]:bg-white [&>*:nth-child(odd)]:bg-lightpink">
              {orders?.map(
                (
                  item: {
                    id: React.Key | null | undefined;
                    senderProfile: {
                      nickname:
                        | string
                        | number
                        | bigint
                        | boolean
                        | React.ReactElement<
                            any,
                            string | React.JSXElementConstructor<any>
                          >
                        | Iterable<React.ReactNode>
                        | React.ReactPortal
                        | Promise<React.AwaitedReactNode>
                        | null
                        | undefined;
                    };
                    items: { product: { price: any; name: string } }[];
                    orderCustomId:
                      | string
                      | number
                      | bigint
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | Promise<React.AwaitedReactNode>
                      | null
                      | undefined;
                    sentToProfile: {
                      nickname:
                        | string
                        | number
                        | bigint
                        | boolean
                        | React.ReactElement<
                            any,
                            string | React.JSXElementConstructor<any>
                          >
                        | Iterable<React.ReactNode>
                        | React.ReactPortal
                        | Promise<React.AwaitedReactNode>
                        | null
                        | undefined;
                    };
                    status:
                      | string
                      | number
                      | bigint
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | Promise<React.AwaitedReactNode>
                      | null
                      | undefined;
                  },
                  index: number,
                ) => {
                  return (
                    <tr key={item?.id} className="">
                      <td className="px-5 py-3 text-sm">{index + 1}</td>
                      <td className="whitespace-no-wrap px-5 py-3 text-sm font-normal capitalize">
                        {item?.senderProfile?.nickname}
                      </td>
                      <td className="whitespace-no-wrap px-5 py-3 text-sm font-normal capitalize">
                        {item?.items[0]?.product?.name ?? "N/A"}
                      </td>
                      <td className="whitespace-no-wrap px-5 py-3 text-sm font-normal capitalize">
                        {item?.orderCustomId}
                      </td>
                      <td className="whitespace-no-wrap px-5 py-3 text-sm font-normal capitalize">
                        {item?.sentToProfile?.nickname}
                      </td>
                      <td className="whitespace-no-wrap px-5 py-3 text-sm font-normal capitalize">
                        {item?.status}
                      </td>
                      <td className="whitespace-no-wrap px-5 py-3 text-sm font-normal capitalize">
                        {item?.items[0]?.product?.price ?? "N/A"}
                      </td>

                      <td className="flex items-center px-5 py-3 text-sm">
                        <Link
                          href={`/orders/${item.id}`}
                          className={`whitespace-no-wrap text-md text-Hwhite ml-3 cursor-pointer rounded-md p-2 font-semibold underline`}
                        >
                          View
                        </Link>
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
  );
};

export default OrdersTable;
