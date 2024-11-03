"use client";
import { User } from "@/interfaces";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import ReactPaginate from "react-paginate";

const UsersTables = ({
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
  currentPage:any;
}) => {
  const users = useMemo(() => {
    if (!data?.data) {
      return;
    }
    return data?.data;
  }, [data?.data]);
  console.log(users);

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
                Nickname
              </th>
              <th className="b px-5 py-3 text-center text-sm font-semibold capitalize tracking-wider text-black">
                Email
              </th>

              <th className="b px-5 py-3 text-center text-sm font-semibold capitalize tracking-wider text-black">
                Date of Birth
              </th>
              <th className="b px-5 py-3 text-center text-sm font-semibold capitalize tracking-wider text-black">
                Plan
              </th>
              <th className="b px-5 py-3 text-center text-sm font-semibold capitalize tracking-wider text-black">
                Gender
              </th>
              <th className="b px-5 py-3 text-center text-sm font-semibold capitalize tracking-wider text-black">
                Gender
              </th>
              <th className="b px-5 py-3 text-center text-sm font-semibold capitalize tracking-wider text-black">
                Current Country
              </th>
              <th className="b px-5 py-3 text-center text-sm font-semibold capitalize tracking-wider text-black">
                Actions
              </th>
            </tr>
          </thead>

          {users && (
            <tbody className="w-full text-black shadow-lg [&>*:nth-child(even)]:bg-white [&>*:nth-child(odd)]:bg-lightpink">
              {users?.map(
                (
                  item: {
                    userId: React.Key | null | undefined;
                    nickname: string;
                    email: string;
                    birthday: string;
                    currentPlan: string;
                    gender: string;
                    currentCountry: string;
                    lastSession: string;
                  },
                  index: number,
                ) => (
                  <tr key={item?.userId} className="">
                    <td className="px-5 py-3 text-sm">{index + 1}</td>
                    <td className="whitespace-no-wrap px-5 py-3 text-sm font-normal capitalize">
                      {item?.nickname}
                    </td>
                    <td className="whitespace-no-wrap px-5 py-3 text-sm font-normal capitalize">
                      {item?.email}
                    </td>

                    <td className="whitespace-no-wrap px-5 py-3 text-sm font-normal capitalize">
                      {item?.birthday}
                    </td>
                    <td className="whitespace-no-wrap px-5 py-3 text-sm font-normal capitalize">
                      {item?.currentPlan}
                    </td>
                    <td className="whitespace-no-wrap px-5 py-3 text-sm font-normal capitalize">
                      {item?.gender}
                    </td>
                    <td className="whitespace-no-wrap px-5 py-3 text-sm font-normal capitalize">
                      {item?.currentCountry}
                    </td>
                    <td className="whitespace-no-wrap px-5 py-3 text-sm font-normal capitalize">
                      {item?.lastSession}
                    </td>
                    <td className="flex items-center px-5 py-3 text-sm">
                      <button
                        value={"edit"}
                        // onClick={(e) => {
                        //   dispatch(setItem(item));
                        //   openModalDel(e);
                        // }}
                        className={`whitespace-no-wrap text-md text-Hwhite cursor-pointer rounded-md p-2 font-semibold`}
                      >
                        <svg
                          width="14"
                          height="16"
                          viewBox="0 0 14 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.28544 2.14118H4.14258C4.22115 2.14118 4.28544 2.0769 4.28544 1.99833V2.14118H9.71401V1.99833C9.71401 2.0769 9.77829 2.14118 9.85687 2.14118H9.71401V3.4269H10.9997V1.99833C10.9997 1.36797 10.4872 0.855469 9.85687 0.855469H4.14258C3.51222 0.855469 2.99972 1.36797 2.99972 1.99833V3.4269H4.28544V2.14118ZM13.2854 3.4269H0.714007C0.397935 3.4269 0.142578 3.68225 0.142578 3.99833V4.56975C0.142578 4.64833 0.206864 4.71261 0.285435 4.71261H1.36401L1.80508 14.0519C1.83365 14.6608 2.33722 15.1412 2.94615 15.1412H11.0533C11.664 15.1412 12.1658 14.6626 12.1944 14.0519L12.6354 4.71261H13.714C13.7926 4.71261 13.8569 4.64833 13.8569 4.56975V3.99833C13.8569 3.68225 13.6015 3.4269 13.2854 3.4269ZM10.9158 13.8555H3.08365L2.65151 4.71261H11.3479L10.9158 13.8555Z"
                            fill="black"
                            fill-opacity="0.8"
                          />
                        </svg>
                      </button>
                      <Link
                        href={`/users/${item.userId}`}
                        className={`whitespace-no-wrap text-md text-Hwhite ml-3 cursor-pointer rounded-md p-2 font-semibold underline`}
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ),
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
        activeClassName="active-link"
      />
    </div>
  );
};

export default UsersTables;
