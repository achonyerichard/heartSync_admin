"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon, SaveIcon, Trash2 } from "lucide-react";
import React, { SyntheticEvent, useState } from "react";
const data = {
    id: 1,
    title: "Basic Plan",
    price: 9.99,
    color: "#e2e8f0", // Hex color for light gray
    benefits: ["Access to basic features", "Email support", "Community access"],
  };
const EditMembershipForm = () => {
  const [benefits, setBenefits] = useState<string[]>([""]); // Start with an empty benefit input

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
  return (
    <div className="lg:m-10 rounded-sm border border-gray">
      <form className="p-4">
        <Input
          className={`transition3 border-gray mb-7 h-14 bg-gray ${false ? "border-primary text-primary" : ""}`}
          placeholder="Title"
          name="tiitle"
          //   onChange={handleInputChange}
          //   onFocus={(e) => handleErrorChange(e.target.name, false, "")}
          //   message={error.email.message}
        />{" "}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Input
            className={`transition3 border-gray mb-7 h-14 bg-gray ${false ? "border-primary text-primary" : ""}`}
            placeholder="Price"
            name="price"
            type="number"
            //   onChange={handleInputChange}
            //   onFocus={(e) => handleErrorChange(e.target.name, false, "")}
            //   message={error.email.message}
          />
          <Input
            className={`transition3 border-gray mb-7 h-14 bg-gray ${false ? "border-primary text-primary" : ""}`}
            placeholder="Insert a Hex Code"
            name="color"
            type="text"

            //   onChange={handleInputChange}
            //   onFocus={(e) => handleErrorChange(e.target.name, false, "")}
            //   message={error.email.message}
          />
        </div>
        <span className="flex items-center justify-center bg-lightpink p-2">
          <p>Benefits</p>
        </span>
        <ul className="mt-4 flex flex-col space-y-2">
          {benefits.map((benefit, index) => (
            <li key={index} className="mb-2 flex items-center gap-2">
              <Input
                className={`transition3 border-gray h-14 bg-gray ${false ? "border-primary text-primary" : ""}`}
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
          <Button
            onClick={handleAddBenefit}
            className="mt-2 flex h-10 w-40 items-center justify-center gap-2 rounded-[10px] bg-green-500 px-3 text-white"
          >
            <SaveIcon size={20} />
            Save
          </Button>
        </span>
      </form>
    </div>
  );
};

export default EditMembershipForm;
