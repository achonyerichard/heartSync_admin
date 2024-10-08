"use client";
import { Orders } from "@/interfaces";
import Link from "next/link";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
export const items: Orders[] = [
  {
    id:1,
    sentBy: "John Doe",
    product: "Laptop",
    orderId: "ORD123456",
    date: "2024-09-28",
    status: "Shipped",
    amount: 1200.5,
  },
  {
    id:2,
    sentBy: "Jane Smith",
    product: "Smartphone",
    orderId: "ORD123457",
    date: "2024-09-29",
    status: "Processing",
    amount: 799.99,
  },
  {
    id:3,
    sentBy: "Michael Brown",
    product: "Headphones",
    orderId: "ORD123458",
    date: "2024-09-30",
    status: "Delivered",
    amount: 199.99,
  },
  {
    id:4,
    sentBy: "Emily Davis",
    product: "Tablet",
    orderId: "ORD123459",
    date: "2024-10-01",
    status: "Cancelled",
    amount: 499.0,
  },
  {
    id:5,
    sentBy: "William Johnson",
    product: "Gaming Console",
    orderId: "ORD123460",
    date: "2024-10-02",
    status: "Shipped",
    amount: 599.99,
  },
];

const OrdersTable = () => {
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
      <div className="h-auto w-full overflow-auto bg-white shadow-xl">
        <table className="no-scrollbar w-full overflow-scroll leading-normal lg:overflow-hidden">
          <thead>
            <tr className="border-gray-400 border-b bg-white">
              <th className="b px-5 py-3 text-center text-sm font-semibold capitalize tracking-wider text-black">
                S/N
              </th>

              <th className="b px-5 py-3 text-center text-sm font-semibold capitalize tracking-wider text-black">
                Aent By
              </th>
              <th className="b px-5 py-3 text-center text-sm font-semibold capitalize tracking-wider text-black">
                Product
              </th>
              <th className="b px-5 py-3 text-center text-sm font-semibold capitalize tracking-wider text-black">
                Order Id
              </th>
              <th className="b px-5 py-3 text-center text-sm font-semibold capitalize tracking-wider text-black">
                Date of Birth
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

          {currentItems && (
            <tbody className="w-full text-black shadow-lg [&>*:nth-child(even)]:bg-white [&>*:nth-child(odd)]:bg-lightpink">
              {currentItems?.map((item, index) => (
                <tr key={item?.id} className="">
                  <td className="px-5 py-3 text-sm">{index + 1}</td>
                  <td className="whitespace-no-wrap px-5 py-3 text-sm font-normal capitalize">
                    {item?.sentBy}
                  </td>
                  <td className="whitespace-no-wrap px-5 py-3 text-sm font-normal capitalize">
                    {item?.product}
                  </td>
                  <td className="whitespace-no-wrap px-5 py-3 text-sm font-normal capitalize">
                    {item?.orderId}
                  </td>
                  <td className="whitespace-no-wrap px-5 py-3 text-sm font-normal capitalize">
                    {item?.date}
                  </td>
                  <td className="whitespace-no-wrap px-5 py-3 text-sm font-normal capitalize">
                    {item?.status}
                  </td>
                  <td className="whitespace-no-wrap px-5 py-3 text-sm font-normal capitalize">
                    {item?.amount}
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
              ))}
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
