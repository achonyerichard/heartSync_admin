"use client";
import { Button } from "@/components/ui/button";
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { Ban, ListCheck, Trash2, TriangleAlert } from "lucide-react";
import { Spinner } from "@radix-ui/themes";

const ConfirmActionModal = ({
  text,
  close,
  handleApprove,
  loading,
  isApproved,
}: {
  type: "disapprove" | "approve"| "view";
  close: () => void;
  handleApprove: () => void;
  text?: string;
  loading: Boolean;
  isApproved: Boolean;
}) => {
  return (
    <div
      className={`relative max-h-[95vh] w-[90%] overflow-y-auto rounded-xl border-t-4 ${isApproved ? "border-yellow-500" : "border-primary"} bg-white p-6 lg:w-[35%]`}
    >
      {" "}
      <div className="mb-5 flex items-center gap-x-2.5">
        {isApproved ? (
          <Ban size={20} color="#986934" />
        ) : (
          <ListCheck size={20} color="green" />
        )}
        <span className="text-[20px] font-bold capitalize">
          {isApproved ? "Disapprove" : "Approve"}
        </span>
      </div>
      <div className="flex items-center gap-x-2.5 pb-3">
        <TriangleAlert size={14} color="#986934" />
        <h3 className="text-sm font-semibold text-yellow-800">
          Warning: This action can be critical to the user.
        </h3>
      </div>
      <p>{text}</p>
      <div className="mt-4 flex items-center justify-end gap-4">
        <Button
          variant="outline"
          className="active:bg-gray-200 flex h-10 w-auto items-center gap-2 bg-lightpink"
          onClick={() => {
            close();
          }}
        >
          Cancel
        </Button>
        <Button
          variant="outline"
          className="flex h-10 w-auto items-center gap-2 bg-green-500 border-none hover:bg-green-700 text-white"
          onClick={() => {
            handleApprove();
          }}
        >
          {loading ? (
            <Spinner size="2" loading={true} />
          ) : (
            <>{isApproved ? "Disapprove" : "Approve"}</>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ConfirmActionModal;
