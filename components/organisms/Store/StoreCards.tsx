"use client";

import React, { useMemo, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import Modal from "@/components/molecules/Modals/ModalBackground";
import DeleteModal from "@/components/molecules/Modals/DeleteModal/DeleteModal";
import { Edit2Icon, MapPinHouse, Store } from "lucide-react";

import { useMutate } from "@/hooks/useHttpRequest";

import { Flip, toast } from "react-toastify";
import EditModal from "@/components/molecules/Modals/StoreModal.tsx/EditStoreModal";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
const latest = [
  { name: "Lucid Dreams", country: "united states of America", _id: "1" },
  { name: "Divas Store", country: "Nigeria", _id: "2" },
  { name: "Richarx Store", country: "Nigeria", _id: "3" },
  { name: "Jmaie's Store", country: "United States of America", _id: "4" },
];
const StoreCards = ({ data, refetch }: { data: any; refetch: any }) => {
  const [open, setOpen] = useState(false);

  const stores = useMemo(() => {
    if (!data?.data?.data) {
      return;
    }
    return data?.data?.data;
  }, [data?.data?.data]);

  const idRef = useRef<string>("");
  const nameRef = useRef<string>("");
  const regionRef = useRef<string>("");
  const { mutate: deleteMutate, isLoading: deleteLoading } = useMutate(
    "delete",
    `/stores/deleteStore/${idRef.current}`,
    (data) => {
      toast.success(data?.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip,
      });
      setTimeout(() => {
        setOpen(false);
        refetch();
      }, 1000);
    },
    undefined,
    (err: any) => {
      toast.error(err.response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip,
      });
    },
  );
  const { mutate: editMutate, isLoading: editLoading } = useMutate(
    "patch",
    `/stores/updateStore/${idRef.current}`,
    (data) => {
      toast.success(data?.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip,
      });
      setTimeout(() => {
        setOpen(false);
        refetch();
      }, 1000);
    },
    undefined,
    (err: any) => {
      toast.error(err.response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip,
      });
    },
  );
  const [modalType, setModalType] = useState<"delete" | "edit" | "">("");
  const typeRef = useRef<"delete" | "update">("delete");
  let itemsPerPage = 4;
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;

  const currentItems = stores?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(stores?.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: { selected: any }) => {
    const newOffset = (event.selected * itemsPerPage) % stores?.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`,
    );
    setItemOffset(newOffset);
  };
  return (
    <div>
      <div className="mt-5 grid grid-cols-1 gap-4 lg:mt-10 lg:grid-cols-4">
        {currentItems?.map(
          (item: {
            country: string;
            _id: React.Key | null | string;
            name: string;
          }) => (
            <Card
              key={item._id}
              className="border-none bg-lightpink py-3 shadow-xl"
            >
              <CardContent>
                <span className="flex items-center gap-2">
                  <Store size={12} />
                  <h4 className="font-semibold"> {item.name}</h4>
                </span>
                <span className="flex items-center gap-2">
                  <MapPinHouse size={12} />
                  <p className="capitalize">{item.country}</p>
                </span>
              </CardContent>
              <CardFooter className="flex justify-end gap-x-2">
                {" "}
                <button
                  onClick={() => {
                    setOpen(true);
                    idRef.current = item._id?.toString()!;
                    setModalType("delete");
                  }}
                  className={`whitespace-no-wrap text-md cursor-pointer rounded-md bg-pink-200 p-2 font-semibold text-black`}
                >
                  <svg
                    width="14"
                    height="16"
                    viewBox="0 0 14 16"
                    fill="red"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.28544 2.14118H4.14258C4.22115 2.14118 4.28544 2.0769 4.28544 1.99833V2.14118H9.71401V1.99833C9.71401 2.0769 9.77829 2.14118 9.85687 2.14118H9.71401V3.4269H10.9997V1.99833C10.9997 1.36797 10.4872 0.855469 9.85687 0.855469H4.14258C3.51222 0.855469 2.99972 1.36797 2.99972 1.99833V3.4269H4.28544V2.14118ZM13.2854 3.4269H0.714007C0.397935 3.4269 0.142578 3.68225 0.142578 3.99833V4.56975C0.142578 4.64833 0.206864 4.71261 0.285435 4.71261H1.36401L1.80508 14.0519C1.83365 14.6608 2.33722 15.1412 2.94615 15.1412H11.0533C11.664 15.1412 12.1658 14.6626 12.1944 14.0519L12.6354 4.71261H13.714C13.7926 4.71261 13.8569 4.64833 13.8569 4.56975V3.99833C13.8569 3.68225 13.6015 3.4269 13.2854 3.4269ZM10.9158 13.8555H3.08365L2.65151 4.71261H11.3479L10.9158 13.8555Z"
                      fill="red"
                      fill-opacity="0.8"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    setOpen(true);
                    typeRef.current = "update";
                    setModalType("edit");
                    idRef.current = item?._id?.toString()!;
                    nameRef.current = item?.name?.toString()!;
                    regionRef.current = item?.country?.toString()!;
                  }}
                  className={`whitespace-no-wrap text-md cursor-pointer rounded-md bg-pink-200 p-2 font-semibold text-black`}
                >
                  <Edit2Icon size={15} color="green" />
                </button>
              </CardFooter>
            </Card>
          ),
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
        activeClassName="active-link"
      />
      <Modal open={open} setOpen={() => setOpen(false)}>
        {modalType === "delete" ? (
          <DeleteModal
            type={typeRef.current}
            close={() => setOpen(false)}
            loading={deleteLoading}
            handleDelete={() => {
              deleteMutate({});
            }}
            text="Do you to permanently delete this Store type? "
          />
        ) : (
          <EditModal
            // id={idRef.current}
            type={typeRef.current}
            setOpen={() => setOpen(false)}
            loading={editLoading}
            mutate={editMutate}
            name={nameRef.current}
            region={regionRef.current}
          />
        )}
      </Modal>
    </div>
  );
};

export default StoreCards;
