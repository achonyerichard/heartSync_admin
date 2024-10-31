"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Progress } from "@/components/ui/progress";
import market_image from "@/public/images/mrkt_dummy_image.jpg";
import Modal from "@/components/molecules/Modals/ModalBackground";
import { CustomCard } from "@/components/atoms/CustomCard/CustomCard";
import { Button } from "@/components/ui/button";
import ReactPaginate from "react-paginate";
import { useFetch, useMutate, usePaginatedFetch } from "@/hooks/useHttpRequest";
import DeleteModal from "@/components/molecules/Modals/DeleteModal/DeleteModal";
import ProductTable from "@/components/tables/ProductTable";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Skeleton } from "@/components/ui/skeleton";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay } from "swiper/modules";

const Item = ({
  item,
  onClick,
}: {
  item: any;
  onClick: (prop: any) => void;
}) => {
  const router = useRouter();
  return (
    <CustomCard className="transition3 cursor-pointer">
      <div className="mb-2 items-center gap-x-4 xl:mb-4 xl:flex">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="mySwiper w-4/12 grow-0"
        >
          {" "}
          {item.imagesUrl.map((image: string, index: number) => (
            <SwiperSlide key={index}>
              <Image
                src={image}
                className="shrink-none h-auto w-full rounded-md object-cover max-xl:mb-2 max-xl:aspect-square xl:h-20 xl:w-20 xl:rounded-lg"
                alt=""
                height={500}
                width={500}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="w-8/12 shrink-0 grow">
          <p className="text-sm font-semibold xl:text-base">{item.name}</p>
          <p className="mb-1 text-sm font-semibold text-lightgray xl:mb-2">
            {item.category}
          </p>{" "}
          <div className="flex justify-between">
            <p className="text-sm font-semibold xl:text-base">${item.price}</p>
            <p className="font-semibold text-lightgray">{item.stock} left</p>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <p className="hidden text-base font-semibold xl:block">Description</p>
        <p className="hidden text-sm font-semibold text-lightgray xl:block">
          {item.description}
        </p>
      </div>
      <div className="flex justify-end space-x-2">
        <Button variant="default" onClick={onClick} className="px-6">
          Delete
        </Button>{" "}
        <Button
          variant="outline"
          onClick={() => {
            router.push(
              `/marketplace/create-product?id=${item.productId}&name=${item.name}&description=${item.description}&price=${item.price}&stock=${item.stock}&imagesUrl=${item.imagesUrl.join("!")}&category=${item.category.map((itm: string) => itm.replace(" ", "-")).join("!")}&size=${item.size.join("!")}&color=${item.color.join("!")}&productMaterial=${item.productMaterial}`,
            );
          }}
          className="px-6"
        >
          Edit
        </Button>
      </div>
    </CustomCard>
  );
};

const Page = () => {
  let itemsPerPage = 20;
  const router = useRouter();
  const role = getCookie("heartsyncRole");
  const typeRef = useRef<string>("");
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const { isLoading, data, refetch } = usePaginatedFetch(
    "fetch-products",
    "products/getAllProducts",
    currentPage + 1, // Backend expects 1-based page index
    itemsPerPage,
    {
      dataKey: "products", // If the data array is under `users`
      totalPagesKey: "totalPages", // If the total pages key is `totalUsersPages`
      totalItemsKey: "totalUsers", // If the total items key is `totalUsers`
      currentPageKey: "currentPage", // If current page is under `current`
    },
    undefined,
    () => toast.error("Failed to fetch admins"),
  );

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected); // React Paginate provides 0-based page index
  };

  const { mutate, isLoading: isDeleteLoading } = useMutate(
    "delete",
    `products/deleteProduct/${typeRef.current}`,
    (data) => {
      toast.success("Product deleted successfully");
      refetch();
    },
    undefined,
    () => {
      toast.error("Something went wrong");
    },
  );
  useEffect(() => {
    refetch;
  }, [currentPage]);
  return (
    <>
      {" "}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-x-1.5 xl:gap-x-2.5">
          <svg
            width="32"
            height="33"
            viewBox="0 0 32 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 xl:h-8 xl:w-8"
          >
            <path
              d="M27 9.00006H23.7575C24.2215 8.32517 24.4794 7.53004 24.5 6.71131C24.5185 6.0876 24.4093 5.46669 24.1791 4.88673C23.9489 4.30676 23.6025 3.77999 23.1613 3.33877C22.7201 2.89754 22.1933 2.55119 21.6133 2.32097C21.0334 2.09076 20.4125 1.98155 19.7887 2.00006C19.2127 2.01236 18.6453 2.14362 18.1224 2.38562C17.5995 2.62762 17.1322 2.97512 16.75 3.40631C16.4681 3.7279 16.217 4.07526 16 4.44381C15.783 4.07526 15.5319 3.7279 15.25 3.40631C14.8678 2.97512 14.4005 2.62762 13.8776 2.38562C13.3547 2.14362 12.7873 2.01236 12.2113 2.00006C11.5875 1.98155 10.9666 2.09076 10.3867 2.32097C9.8067 2.55119 9.27993 2.89754 8.83871 3.33877C8.39748 3.77999 8.05113 4.30676 7.82091 4.88673C7.5907 5.46669 7.48149 6.0876 7.5 6.71131C7.52058 7.53004 7.77853 8.32517 8.2425 9.00006H5C4.33696 9.00006 3.70107 9.26345 3.23223 9.73229C2.76339 10.2011 2.5 10.837 2.5 11.5001V15.5001C2.49988 16.0764 2.69889 16.6351 3.06335 17.0815C3.4278 17.528 3.93532 17.8348 4.5 17.9501V25.5001C4.5 26.1631 4.76339 26.799 5.23223 27.2678C5.70107 27.7367 6.33696 28.0001 7 28.0001H25C25.663 28.0001 26.2989 27.7367 26.7678 27.2678C27.2366 26.799 27.5 26.1631 27.5 25.5001V17.9501C28.0647 17.8348 28.5722 17.528 28.9367 17.0815C29.3011 16.6351 29.5001 16.0764 29.5 15.5001V11.5001C29.5 10.837 29.2366 10.2011 28.7678 9.73229C28.2989 9.26345 27.663 9.00006 27 9.00006ZM26.5 15.0001H17.5V12.0001H26.5V15.0001ZM19 5.39631C19.1106 5.2735 19.2455 5.17491 19.3961 5.10671C19.5467 5.03852 19.7097 5.00221 19.875 5.00006H19.9188C20.1303 4.99946 20.3398 5.04141 20.5348 5.12342C20.7298 5.20543 20.9063 5.32581 21.0538 5.47742C21.2013 5.62902 21.3168 5.80875 21.3935 6.0059C21.4701 6.20306 21.5064 6.41362 21.5 6.62506C21.4979 6.79035 21.4615 6.9534 21.3933 7.10398C21.3252 7.25456 21.2266 7.38941 21.1038 7.50006C20.2413 8.26506 18.8225 8.65756 17.65 8.84506C17.8375 7.67756 18.23 6.25881 19 5.39631ZM10.9625 5.46256C11.2592 5.16903 11.6589 5.00306 12.0763 5.00006H12.125C12.2903 5.00221 12.4533 5.03852 12.6039 5.10671C12.7545 5.17491 12.8894 5.2735 13 5.39631C13.765 6.25881 14.1575 7.67631 14.3438 8.84756C13.1812 8.65881 11.75 8.26631 10.8962 7.50006C10.7734 7.38941 10.6748 7.25456 10.6067 7.10398C10.5385 6.9534 10.5022 6.79035 10.5 6.62506C10.4945 6.41008 10.5326 6.19622 10.6121 5.99641C10.6916 5.79659 10.8108 5.61498 10.9625 5.46256ZM5.5 12.0001H14.5V15.0001H5.5V12.0001ZM7.5 18.0001H14.5V25.0001H7.5V18.0001ZM17.5 25.0001V18.0001H24.5V25.0001H17.5Z"
              fill="#F75555"
            />
          </svg>
          <span className="text-base font-bold xl:text-[20px]">Gifts</span>
        </div>
        <Button
          variant="default"
          onClick={() => {
            router.push("/marketplace/create-product");
          }}
          className=""
        >
          Add New Gifts
        </Button>
      </div>
      {role === "super_admin" && (
        <>
          {isLoading ? (
            <div className="mt-5 flex flex-col [&>*:nth-child(even)]:bg-gray [&>*:nth-child(odd)]:bg-lightpink">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : (
            <ProductTable
              data={data?.data}
              refetch={refetch}
              pageCount={data?.totalPages}
              setCurrentPage={setCurrentPage}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
            />
          )}
        </>
      )}
      {role === "marketer" && (
        <>
          {isLoading ? (
            <div className="mt-5 flex flex-col [&>*:nth-child(even)]:bg-gray [&>*:nth-child(odd)]:bg-lightpink">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : (
            <div className="">
              <div className="grid grid-cols-1 gap-2 xl:grid-cols-3 xl:gap-3">
                {data?.data.map((item: any) => (
                  <div key={item._id}>
                    <Item
                      item={item}
                      onClick={() => {
                        setOpen(true);
                        typeRef.current = item.productId;
                      }}
                    />{" "}
                  </div>
                ))}
              </div>{" "}
              <ReactPaginate
                breakLabel="....."
                nextLabel="Next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={1}
                pageCount={data?.totalPages}
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
          )}
        </>
      )}
      <Modal open={open} setOpen={() => setOpen(false)}>
        <DeleteModal
          type="delete"
          close={() => setOpen(false)}
          handleDelete={() => mutate({})}
          loading={isDeleteLoading}
        />
      </Modal>
    </>
  );
};

export default Page;
