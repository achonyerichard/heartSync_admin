"use client";
import React, { useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import Modal from "../molecules/Modals/ModalBackground";
import DeleteModal from "../molecules/Modals/DeleteModal/DeleteModal";
import { Switch } from "../ui/switch";
import { useMutate } from "@/hooks/useHttpRequest";
import { toast } from "react-toastify";
import ConfirmModal from "../molecules/Modals/DeleteModal/ConfirmationModal";
import ConfirmActionModal from "../molecules/Modals/DeleteModal/ConfirmModal";
import { Eye } from "lucide-react";
import ProductModal from "../molecules/Modals/ProductModal/ProductModal";
import EmptyState from "../organisms/EmptyState/EmptyState";

const ProductTable = ({
  data,
  pageCount,
  setCurrentPage,
  approve,
  isLoading,
  open,
  setOpen,
}: {
  data: any;
  pageCount: any;
  setCurrentPage: any;
  itemsPerPage: any;
  currentPage: any;
  approve: any;
  isLoading: boolean;
  open: boolean;
  setOpen: any;
}) => {
  const [openView, setOpenView] = useState(false);
  const typeRef = useRef<"disapprove" | "approve" | "view">("approve");
  const itemRef = useRef<any>({});
  // Invoke when user click to request another page.
  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected); // React Paginate provides 0-based page index
  };

  return (
    <>
      {data?.length > 0 ? (
        <div>
          <div className="h-auto w-full overflow-auto bg-white shadow-xl">
            <table className="no-scrollbar w-full overflow-scroll leading-normal lg:overflow-hidden">
              <thead>
                <tr className="border-gray-400 border-b bg-white">
                  <th className="b px-5 py-3 text-left text-sm font-semibold capitalize tracking-wider text-black">
                    S/N
                  </th>
                  <th className="b px-5 py-3 text-left text-sm font-semibold capitalize tracking-wider text-black">
                    Title
                  </th>{" "}
                  <th className="b px-5 py-3 text-left text-sm font-semibold capitalize tracking-wider text-black">
                    Price
                  </th>
                  <th className="b px-5 py-3 text-left text-sm font-semibold capitalize tracking-wider text-black">
                    Stock
                  </th>
                  <th className="b px-5 py-3 text-left text-sm font-semibold capitalize tracking-wider text-black">
                    Actions
                  </th>
                </tr>
              </thead>

              {data && (
                <tbody className="w-full text-black shadow-lg [&>*:nth-child(even)]:bg-white [&>*:nth-child(odd)]:bg-lightpink">
                  {data?.map((item: any, index: number) => (
                    <tr key={item?.id} className="">
                      <td className="px-5 py-3 text-sm">{index + 1}</td>
                      <td className="whitespace-no-wrap px-5 py-3 text-sm font-normal capitalize">
                        {item?.name}
                      </td>{" "}
                      <td className="whitespace-no-wrap px-5 py-3 text-sm font-normal capitalize">
                        {`$ ${item?.price}`}
                      </td>
                      <td className="whitespace-no-wrap px-5 py-3 text-sm font-normal capitalize">
                        {item?.stock}
                      </td>
                      <td className="flex items-center gap-x-5 px-5 py-3 text-sm">
                        <Switch
                          title="Approve or Disapprove Product"
                          onCheckedChange={() => {
                            itemRef.current = item;
                            setOpen(true);
                            if (item?.isApproved) {
                              typeRef.current = "approve";
                            } else typeRef.current = "disapprove";
                          }}
                          defaultChecked={item?.isApproved}
                        />
                        <button
                          value={"view"}
                          onClick={() => {
                            setOpenView(true);
                            itemRef.current = item;
                            typeRef.current = "view";
                          }}
                          className={`whitespace-no-wrap text-md text-Hwhite cursor-pointer rounded-md p-2 font-semibold`}
                        >
                          <Eye size={20} />
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
            <ConfirmActionModal
              loading={isLoading}
              isApproved={itemRef?.current?.isApproved}
              type={typeRef.current}
              close={() => setOpen(false)}
              handleApprove={() => {
                if ((typeRef.current = "approve")) {
                  approve({
                    productId: itemRef?.current?.productId,
                    isApproved: false,
                  });
                } else
                  approve({
                    productId: itemRef?.current?.productId,
                    isApproved: true,
                  });
              }}
              text={`Do you want to ${itemRef?.current?.isApproved ? "disapprove" : "approve"} this Product ? `}
            />
          </Modal>
          <Modal open={openView} setOpen={() => setOpenView(false)}>
            <ProductModal
              item={itemRef?.current}
              type={typeRef.current}
              skip={true}
            />
          </Modal>
        </div>
      ) : (
        <EmptyState text={"Proucts"} />
      )}
    </>
  );
};

export default ProductTable;
