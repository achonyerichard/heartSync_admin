"use client";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { CalendarCheck, Trash2, TriangleAlert } from "lucide-react";

const ConfirmModal = ({
  text,
  close,
  type,
  handleConfirm
}: {
  type: "delete" | "update";
  close: () => void;
  handleConfirm: () => void;
  text?: string;
}) => {


  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <div className="relative max-h-[95vh] w-[35%] overflow-y-auto rounded-xl border-t-4 border-green-500 bg-white p-6">
      {" "}
      <div className="mb-5 flex items-center gap-x-2.5">
        <CalendarCheck  size={20} color="green" />
        <span className="text-[20px] font-bold capitalize">Confirm Action</span>
      </div>
      
      <p>{text}</p>
      <div className="mt-4 flex items-center justify-end gap-4">
        <Button
          variant="outline"
          className="flex h-10 w-auto items-center gap-2 text-yellow-500 border border-yellow-500 active:bg-primary"
          onClick={() => {
            close()
           
          }}
        >
          Cancel
         
        </Button>
        <Button
          variant="outline"
          className="flex h-10 w-auto items-center gap-2 bg-green-500 border-none text-white"
          onClick={() => {
            handleConfirm()
           
          }}
        >
            
          Confirm
         
        </Button>
      </div>
    </div>
  );
};

export default ConfirmModal;
