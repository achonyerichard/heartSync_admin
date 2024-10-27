"use client";
import { Membership, Users } from "@/interfaces";
import Link from "next/link";
import React, { useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import Modal from "../molecules/Modals/ModalBackground";
import DeleteModal from "../molecules/Modals/DeleteModal/DeleteModal";
import { Edit2Icon } from "lucide-react";
import { useMutate } from "@/hooks/useHttpRequest";
import { toast } from "react-toastify";
export const items: Users[] = [
  {
    id: "1",
    name: "John Doe",
    createdAt: "28-03-2004",
    email: "",
    role: "Marketer",
  },
  {
    id: "2",
    email: "",
    name: "John Doe",
    createdAt: "28-03-2004",
    role: "Admin",
  },
];

const CategoryTable = ({
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
  const idRef = useRef("");
  const [open, setOpen] = useState(false);
  const typeRef = useRef<"delete" | "update">("delete");

  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);

  // Invoke when user click to request another page.
  const handlePageClick = (event: { selected: any }) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setCurrentPage(event.selected);
    setItemOffset(newOffset);
  };

  const { mutate, isLoading } = useMutate(
    "delete",
    `admins/deleteAdmin/${idRef.current}`,
    (data) => {
      setOpen(false);
      toast.success("Admin deleted successfully");
      refetch();
    },
    undefined,
    () => {
      toast.error("Failed to remove admin");
    },
  );

  return (
    <div>
      <div className="h-auto w-full overflow-auto bg-white shadow-xl">
        <table className="no-scrollbar w-full overflow-scroll leading-normal lg:overflow-hidden">
          <thead>
            <tr className="border-gray-400 border-b bg-white">
              <th className="b px-5 py-3 text-left text-sm font-semibold capitalize tracking-wider text-black">
                S/N
              </th>

              <th className="b px-5 py-3 text-left text-sm font-semibold capitalize tracking-wider text-black">
                Name
              </th>
              <th className="b px-5 py-3 text-left text-sm font-semibold capitalize tracking-wider text-black">
                Role
              </th>
              <th className="b px-5 py-3 text-left text-sm font-semibold capitalize tracking-wider text-black">
                Date Created
              </th>

              <th className="b px-5 py-3 text-left text-sm font-semibold capitalize tracking-wider text-black">
                Actions
              </th>
            </tr>
          </thead>

          {currentItems && (
            <tbody className="w-full text-black shadow-lg [&>*:nth-child(even)]:bg-white [&>*:nth-child(odd)]:bg-lightpink">
              {data?.data?.map((item: any, index: number) => (
                <tr key={item?.id} className="">
                  <td className="px-5 py-3 text-sm">{index + 1}</td>
                  <td className="whitespace-no-wrap px-5 py-3 text-sm font-normal capitalize">
                    {item?.name}
                  </td>
                  <td className="whitespace-no-wrap px-5 py-3 text-sm font-normal capitalize">
                    {item?.role}
                  </td>
                  <td className="whitespace-no-wrap px-5 py-3 text-sm font-normal capitalize">
                    {`$ ${item?.createdAt.split("T")[0]}`}
                  </td>

                  <td className="flex items-center px-5 py-3 text-sm">
                    <button
                      value={"delete"}
                      onClick={() => {
                        setOpen(true);
                        typeRef.current = "delete";
                        idRef.current = item?._id;
                      }}
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
                    <button
                      value={"delete"}
                      onClick={() => {
                        setOpen(true);
                        typeRef.current = "delete";
                      }}
                      className={`whitespace-no-wrap text-md text-Hwhite cursor-pointer rounded-md p-2 font-semibold`}
                    >
                      <Edit2Icon size={15} color="green" />
                    </button>
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
      <Modal open={open} setOpen={() => setOpen(false)}>
        <DeleteModal
          loading={isLoading}
          type={typeRef.current}
          close={() => setOpen(false)}
          handleDelete={() => mutate({})}
          text="Do you to permanently delete this Membership type? "
        />
      </Modal>
    </div>
  );
};

export default CategoryTable;
