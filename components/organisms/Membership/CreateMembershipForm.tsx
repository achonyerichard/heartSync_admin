"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon, SaveIcon, Trash2 } from "lucide-react";
import React, { SyntheticEvent, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Flip, toast } from "react-toastify";
import { useMutate } from "@/hooks/useHttpRequest";
import { Spinner } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
interface IFormInput {
  name: string;
  cost: string;
  region: string;
  timeline: string;
}

const EditMembershipForm = () => {
  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      timeline: "", // Default value for the select
      region: "", // Default value for the select
    },
  });

  const { mutate, isLoading } = useMutate(
    "post",
    "plans/create",
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
        router.push("/membership");
      }, 1500);
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
  const [benefits, setBenefits] = useState<string[]>([""]); // Start with an empty benefit input
  const [color, setColor] = useState("#aabbcc");
  // Function to handle input change for a specific benefit
  const handleInputChange = (index: number, value: string) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index] = value;
    setBenefits(updatedBenefits);
  };

  // Function to add a new benefit input field
  const handleAddBenefit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(benefits);
    setBenefits([...benefits, ""]); // Add a new empty benefit
  };

  // Function to delete a benefit input field
  const handleDeleteBenefit = (index: number) => {
    const updatedBenefits = benefits.filter((_, i) => i !== index);
    setBenefits(updatedBenefits);
  };
  const onSubmit: SubmitHandler<IFormInput> = (data: any) => {
    data.cost = Number(data.cost);
    const newData = { benefits, color: color, ...data };
    console.log(newData);
    mutate(newData);
    reset();
  };
  return (
    <div className="rounded-sm border border-gray lg:m-10">
      <form className="p-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-7">
          <div></div>
          <Input
            className={`transition3 h-14 border-gray bg-gray ${errors?.name ? "border-primary text-primary" : ""}`}
            placeholder="Name"
            {...register("name", { required: "Name is required" })}
            //   onChange={handleInputChange}
            //   onFocus={(e) => handleErrorChange(e.target.name, false, "")}
            //   message={error.email.message}
          />{" "}
          {errors?.name && (
            <span className="duration-1500 text-xs text-red-500 transition-all ease-out">
              {errors?.name.message}
            </span>
          )}
        </div>
        <div className="mb-7">
          <Input
            className={`transition3 h-14 border-gray bg-gray ${errors?.cost ? "border-primary text-primary" : ""}`}
            placeholder="Cost"
            {...register("cost", { required: "Cost is required" })}
            type="number"
            //   onChange={handleInputChange}
            //   onFocus={(e) => handleErrorChange(e.target.name, false, "")}
            //   message={error.email.message}
          />
          {errors?.cost && (
            <span className="duration-1500 text-xs text-red-500 transition-all ease-out">
              {errors?.cost.message}
            </span>
          )}
        </div>
        <div className="mb-7 grid grid-cols-1 gap-x-4 gap-y-4 lg:grid-cols-2 lg:gap-y-0">
          <div>
            <Controller
              name="timeline"
              control={control}
              rules={{ required: "Timeline is required" }}
              render={({ field: { onChange, value } }) => (
                <Select onValueChange={onChange} value={value}>
                  <SelectTrigger className="h-14 w-full rounded-[16px] border-none bg-gray">
                    <SelectValue placeholder="Select a Timeline" />
                  </SelectTrigger>

                  <SelectContent className="border-none bg-gray">
                    <SelectItem value="week">Weekly</SelectItem>
                    <SelectItem value="month">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.timeline && (
              <p className="mt-2 text-sm text-red-600">
                {errors.timeline.message}
              </p>
            )}
          </div>
          <div>
            <Controller
              name="region"
              control={control}
              rules={{ required: "Region is required" }}
              render={({ field: { onChange, value } }) => (
                <Select onValueChange={onChange} value={value}>
                  <SelectTrigger className="h-14 w-full rounded-[16px] border-none bg-gray">
                    <SelectValue placeholder="Select a Region" />
                  </SelectTrigger>

                  <SelectContent className="border-none bg-gray">
                    {/* <SelectItem value="asia">Asia</SelectItem> */}
                    <SelectItem value="united states">United States</SelectItem>
                    <SelectItem value="africa">Africa</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.region && (
              <p className="mt-2 text-sm text-red-600">
                {errors.region.message}
              </p>
            )}
          </div>
        </div>
        <div className="mb-5 flex justify-center">
          <HexColorPicker color={color} onChange={setColor} />
        </div>

        <span className="flex items-center justify-center bg-lightpink p-2">
          <p>Benefits</p>
        </span>
        <ul className="mt-4 flex flex-col space-y-2">
          {benefits.map((benefit, index) => (
            <li key={index} className="mb-2 flex items-center gap-2">
              <Input
                className={`transition3 h-14 border-gray bg-gray ${false ? "border-primary text-primary" : ""}`}
                placeholder="Add a benefit "
                name="color"
                type="text"
                //   onChange={handleInputChange}
                //   onFocus={(e) => handleErrorChange(e.target.name, false, "")}
                //   message={error.email.message}
                value={benefit} // Bound to the benefit state at that index
                onChange={(e) => handleInputChange(index, e.target.value)} // Update the specific benefit
              />

              <button
                onClick={() => handleDeleteBenefit(index)} // Delete the benefit
              >
                <Trash2 size={12} color="red" />
              </button>
            </li>
          ))}
        </ul>
        <Button
          onClick={handleAddBenefit}
          className="mt-2 flex h-10 w-auto items-center gap-2 rounded-[10px] bg-secondary px-3 text-white"
        >
          <PlusIcon size={20} />
          Add Benefit
        </Button>
        <span className="flex justify-end">
          <Button className="mt-2 flex h-10 w-40 items-center justify-center gap-2 rounded-[10px] bg-green-500 px-3 text-white">
            {isLoading ? (
              <Spinner size="2" loading={true} />
            ) : (
              <>
                {" "}
                <SaveIcon size={20} />
                Save
              </>
            )}
          </Button>
        </span>
      </form>
    </div>
  );
};

export default EditMembershipForm;
