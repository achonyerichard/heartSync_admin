"use client";
import DeleteModal from "@/components/molecules/Modals/DeleteModal/DeleteModal";
import Modal from "@/components/molecules/Modals/ModalBackground";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useRef, useState } from "react";

const UserImages = () => {
  const [open, setOpen] = useState(false);
  const typeRef = useRef<"delete" | "update">("delete");
  const images = [
    "/images/user-image1.png",
    "/images/user-image2.png",
    "/images/user-image-3.png",
  ];
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {images.map((img) => (
          <div key={img} className="relative">
            <button
              onClick={() => {
                setOpen(true);
                typeRef.current = "delete";
              }}
              className="absolute -right-1 -top-1"
            >
              <svg
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.666992 10C0.666992 4.47715 5.14415 0 10.667 0C16.1898 0 20.667 4.47715 20.667 10C20.667 15.5228 16.1898 20 10.667 20C5.14415 20 0.666992 15.5228 0.666992 10Z"
                  fill="#EA1E61"
                />
                <path
                  d="M11.607 10L14.4736 7.14C14.5992 7.01446 14.6697 6.8442 14.6697 6.66666C14.6697 6.48913 14.5992 6.31887 14.4736 6.19333C14.3481 6.06779 14.1778 5.99727 14.0003 5.99727C13.8227 5.99727 13.6525 6.06779 13.527 6.19333L10.667 9.06L7.80695 6.19333C7.68142 6.06779 7.51115 5.99727 7.33362 5.99727C7.15608 5.99727 6.98582 6.06779 6.86028 6.19333C6.73475 6.31887 6.66422 6.48913 6.66422 6.66666C6.66422 6.8442 6.73475 7.01446 6.86028 7.14L9.72695 10L6.86028 12.86C6.7978 12.922 6.7482 12.9957 6.71436 13.0769C6.68051 13.1582 6.66309 13.2453 6.66309 13.3333C6.66309 13.4213 6.68051 13.5085 6.71436 13.5897C6.7482 13.671 6.7978 13.7447 6.86028 13.8067C6.92226 13.8691 6.99599 13.9187 7.07723 13.9526C7.15847 13.9864 7.24561 14.0039 7.33362 14.0039C7.42163 14.0039 7.50876 13.9864 7.59 13.9526C7.67124 13.9187 7.74498 13.8691 7.80695 13.8067L10.667 10.94L13.527 13.8067C13.5889 13.8691 13.6627 13.9187 13.7439 13.9526C13.8251 13.9864 13.9123 14.0039 14.0003 14.0039C14.0883 14.0039 14.1754 13.9864 14.2567 13.9526C14.3379 13.9187 14.4116 13.8691 14.4736 13.8067C14.5361 13.7447 14.5857 13.671 14.6195 13.5897C14.6534 13.5085 14.6708 13.4213 14.6708 13.3333C14.6708 13.2453 14.6534 13.1582 14.6195 13.0769C14.5857 12.9957 14.5361 12.922 14.4736 12.86L11.607 10Z"
                  fill="white"
                />
              </svg>
            </button>
            <Image
              src={img}
              alt="auth_layout_image"
              width={500}
              height={500}
              className="h-80 w-full object-cover"
            />
          </div>
        ))}
      </div>
      <Modal open={open} setOpen={() => setOpen(false)}>
        <DeleteModal
          loading={false}
          type={typeRef.current}
          close={() => setOpen(false)}
          handleDelete={() => {}}
          text="Do you to permanently delete this Anthony's picture? "
        />
      </Modal>
    </div>
  );
};

export default UserImages;
