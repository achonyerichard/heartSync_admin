"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Edit,
  Edit3Icon,
  EditIcon,
  PlusIcon,
  SaveIcon,
  Trash2,
} from "lucide-react";
import React, { SyntheticEvent, useState } from "react";

const data = {
  id: 1,
  title: "Basic Plan",
  price: 9.99,
  color: "#e2e8f0", // Hex color for light gray
  benefits: ["Access to basic features", "Email support", "Community access"],
};
const EditMembershipForm = () => {
  const [title, setTitle] = useState<string>(data.title);
  const [price, setPrice] = useState<number>(data.price);
  const [color, setColor] = useState<string>(data.color);
  const [benefits, setBenefits] = useState<string[]>(data.benefits); // Start with an empty benefit

  // State to manage the edit mode for each field
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);
  const [isEditingPrice, setIsEditingPrice] = useState<boolean>(false);
  const [isEditingColor, setIsEditingColor] = useState<boolean>(false);
  const [isEditingBenefits, setIsEditingBenefits] = useState<boolean[]>([true]); // First benefit is editable

  // Handle input change for title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // Handle input change for price
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(parseFloat(e.target.value));
  };
  // Handle input change for price
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  // Handle input change for a specific benefit
  const handleBenefitChange = (index: number, value: string) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index] = value;
    setBenefits(updatedBenefits);
  };

  // Handle adding a new benefit
  const handleAddBenefit = () => {
    setBenefits([...benefits, ""]); // Add a new empty benefit
    setIsEditingBenefits([...isEditingBenefits, true]); // Make the new benefit editable
  };

  // Handle deleting a specific benefit
  const handleDeleteBenefit = (index: number) => {
    const updatedBenefits = benefits.filter((_, i) => i !== index);
    const updatedEditing = isEditingBenefits.filter((_, i) => i !== index);
    setBenefits(updatedBenefits);
    setIsEditingBenefits(updatedEditing);
  };

  // Toggle editing state for a benefit
  const toggleEditingBenefit = (index: number) => {
    const updatedEditing = [...isEditingBenefits];
    updatedEditing[index] = !updatedEditing[index];
    setIsEditingBenefits(updatedEditing);
  };

  const handleSave = (e: SyntheticEvent) => {
    e.preventDefault();
    const savedData = {
      title,
      price,
      color,
      benefits,
    };
    console.log("Saved Data:", savedData);
  };

  return (
    <div className="rounded-sm border border-gray lg:m-10">
      <form className="p-4">
        <div className="mb-7 flex items-center gap-2">
          <Input
            className={`transition3 focus:border-gray-500 h-14 bg-gray disabled:border-gray disabled:bg-white disabled:font-semibold disabled:text-black ${false ? "border-primary text-primary" : ""}`}
            placeholder="Title"
            name="tiitle"
            value={title}
            disabled={!isEditingTitle} // Toggle editability
            onChange={handleTitleChange}
            //   onChange={handleInputChange}
            //   onFocus={(e) => handleErrorChange(e.target.name, false, "")}
            //   message={error.email.message}
          />{" "}
          <button
            className="text-green-500"
            onClick={(e) => {
              e.preventDefault();
              setIsEditingTitle(!isEditingTitle);
            }} // Toggle edit mode
          >
            {isEditingTitle ? <SaveIcon size={15} /> : <Edit3Icon size={15} />}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="mb-7 flex items-center gap-2">
            <Input
              className={`transition3 focus:border-gray-500 h-14 bg-gray disabled:border-gray disabled:bg-white disabled:font-semibold disabled:text-black ${false ? "border-primary text-primary" : ""}`}
              placeholder="Price"
              name="price"
              type="number"
              value={`${price}`}
              disabled={!isEditingPrice} // Toggle editability
              onChange={handlePriceChange}
              //   onChange={handleInputChange}
              //   onFocus={(e) => handleErrorChange(e.target.name, false, "")}
              //   message={error.email.message}
            />
            <button
              className="text-green-500"
              onClick={(e) => {
                e.preventDefault();
                setIsEditingPrice(!isEditingPrice);
              }} // Toggle edit mode
            >
              {isEditingPrice ? (
                <SaveIcon size={15} />
              ) : (
                <Edit3Icon size={15} />
              )}
            </button>
          </div>
          <div className="mb-7 flex items-center gap-2">
            <Input
              className={`transition3 focus:border-gray-500 h-14 bg-gray disabled:border-gray disabled:bg-white disabled:font-semibold disabled:text-black ${false ? "border-primary text-primary" : ""}`}
              placeholder="Insert a Hex Code"
              name="color"
              type="text"
              value={color}
              disabled={!isEditingColor} // Toggle editability
              onChange={handleColorChange}
              //   onChange={handleInputChange}
              //   onFocus={(e) => handleErrorChange(e.target.name, false, "")}
              //   message={error.email.message}
            />
            <button
              className="text-green-500"
              onClick={(e) => {
                e.preventDefault();
                setIsEditingColor(!isEditingColor);
              }} // Toggle edit mode
            >
              {isEditingColor ? (
                <SaveIcon size={15} />
              ) : (
                <Edit3Icon size={15} />
              )}
            </button>
          </div>
        </div>
        <span className="flex items-center justify-center bg-lightpink p-2">
          <p>Benefits</p>
        </span>
        <ul className="mt-4 flex flex-col space-y-2">
          {benefits.map((benefit, index) => (
            <li key={index} className="mb-2 flex items-center gap-2">
              <Input
                className={`transition3 focus:border-gray-500 h-14 bg-gray disabled:border-gray disabled:bg-white disabled:font-semibold disabled:text-black ${false ? "border-primary text-primary" : ""}`}
                placeholder="Add a benefit "
                name="color"
                type="text"
                value={benefit}
                disabled={!isEditingBenefits[index]} // Toggle editability
                onChange={(e) => handleBenefitChange(index, e.target.value)}
                //   onChange={handleInputChange}
                //   onFocus={(e) => handleErrorChange(e.target.name, false, "")}
                //   message={error.email.message}
              />
              <button
                className="text-green-500"
                onClick={(e) => {
                  e.preventDefault();
                  toggleEditingBenefit(index);
                }} // Toggle edit mode for the benefit
              >
                {isEditingBenefits[index] ? (
                  <SaveIcon size={15} />
                ) : (
                  <Edit3Icon size={15} />
                )}
              </button>
              <button
                onClick={() => handleDeleteBenefit(index)} // Delete the benefit
              >
                <Trash2 size={15} color="red" />
              </button>
            </li>
          ))}
        </ul>
        <Button
          onClick={handleAddBenefit}
          className="mt-2 flex h-10 w-auto items-center gap-2 rounded-[10px] bg-secondary px-3 text-white"
        >
          <PlusIcon size={15} />
          Add Benefit
        </Button>
        <span className="flex justify-end">
          <Button
            onClick={handleSave}
            className="mt-2 flex h-10 w-40 items-center justify-center gap-2 rounded-[10px] bg-green-500 px-3 text-white"
          >
            <SaveIcon size={15} />
            Save
          </Button>
        </span>
      </form>
    </div>
  );
};

export default EditMembershipForm;
