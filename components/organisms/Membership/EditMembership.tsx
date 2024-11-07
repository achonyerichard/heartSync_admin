"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutate } from "@/hooks/useHttpRequest";
import { Spinner } from "@radix-ui/themes";
import {
  Edit,
  Edit3Icon,
  EditIcon,
  PlusIcon,
  SaveIcon,
  Trash2,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Flip, toast } from "react-toastify";
type ItemType = {
  // Define the structure of your item here, for example:
  _id: string;
  name: string;
  cost:any;
  benefits:string[];
  color:string;
  timeline:string

  // Add other properties as needed
};
const data = {
  id: 1,
  title: "Basic Plan",
  price: 9.99,
  color: "#e2e8f0", // Hex color for light gray
  benefits: ["Access to basic features", "Email support", "Community access"],
};
const EditMembershipForm = () => {
  const [item, setItem] = useState<ItemType>({
    name: "",
    cost:'',
    benefits:[],
    _id:"",
    color:"",
    timeline:""
  });
 useEffect(() => {
   if (typeof window !== "undefined") {
     const storedItem = localStorage.getItem("singlePlan");
     if (storedItem) {
       try {
         setItem(JSON.parse(storedItem));
       } catch (error) {
         console.error("Failed to parse item from localStorage:", error);
       }
     }
   }
 }, []);
  const router = useRouter();
  const params = useParams()
  const [title, setTitle] = useState<string| any>(item?.name);
  const [price, setPrice] = useState<number | null| undefined>(item?.cost);
  const [color, setColor] = useState<string | any>(item?.color);
  const [benefits, setBenefits] = useState<string[]>(item?.benefits); // Start with an empty benefit
 const [newBenefit, setNewBenefit] = useState<string>("");
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

 const handleAddBenefit = (e: SyntheticEvent) => {
   e.preventDefault();
   if (newBenefit.trim() !== "") {
     // Only add if newBenefit is not empty
     setBenefits((prevBenefits) => [...item?.benefits, newBenefit]); // Spread old benefits and add the new one
     setIsEditingBenefits((prevEditing) => [...prevEditing, true]); // Make the new benefit editable
     setNewBenefit(""); // Clear the input field
   } else {
       setBenefits((prevBenefits) => [...item?.benefits]);
   }
 };
  // Handle deleting a specific benefit
  const handleDeleteBenefit = (index: number) => {
     if (!benefits[index]) {
       console.warn("Benefit does not exist at the specified index.");
       return;
     }

     const updatedBenefits = benefits.filter((_, i) => i !== index);
     const updatedEditing = isEditingBenefits.filter((_, i) => i !== index);

     setBenefits([...updatedBenefits]);
     setIsEditingBenefits([...updatedEditing]);
  };

  // Toggle editing state for a benefit
  const toggleEditingBenefit = (index: number) => {
    const updatedEditing = [...isEditingBenefits];
    updatedEditing[index] = !updatedEditing[index];
    setIsEditingBenefits(updatedEditing);
  };
 const { mutate, isLoading } = useMutate(
   "patch",
   `admins/updateAdmin/${params?.id}`,
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
  const handleSave = (e: SyntheticEvent) => {
    e.preventDefault();
   
    const savedData = {
      title,
      price,
      color,
      benefits,
    };
      mutate(savedData);
    console.log("Saved Data:", savedData);
  };

  return (
    <div className="rounded-sm border border-gray lg:m-10">
      <form className="p-4">
        <div className="mb-7 flex items-center gap-2">
          <Input
            className={`transition3 h-14 border-gray bg-gray disabled:border-gray disabled:bg-white disabled:font-semibold disabled:text-black ${false ? "border-primary text-primary" : ""}`}
            placeholder="Title"
            name="title"
            defaultValue={item?.name}
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

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-1">
          <div className="mb-7 flex items-center gap-2">
            <Input
              className={`transition3 h-14 border-gray bg-gray disabled:border-gray disabled:bg-white disabled:font-semibold disabled:text-black ${false ? "border-primary text-primary" : ""}`}
              placeholder="Price"
              name="price"
              type="number"
              defaultValue={`${item?.cost}`}
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
          <div className="mb-7 flex items-center justify-center gap-2">
            <HexColorPicker color={item?.color} onChange={setColor} />

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
          {item?.benefits.map((benefit, index) => (
            <li key={index} className="mb-2 flex items-center gap-2">
              <Input
                className="transition3 h-14 border-gray bg-gray"
                placeholder="Add a benefit"
                type="text"
                defaultValue={benefit}
                disabled={!isEditingBenefits[index]} // Toggle editability
                onChange={(e) => handleBenefitChange(index, e.target.value)} // Update benefit value
              />
              <button
                className="text-green-500"
                onClick={(e) => {
                  e.preventDefault();
                  toggleEditingBenefit(index); // Toggle edit mode for the benefit
                }}
              >
                {isEditingBenefits[index] ? (
                  <SaveIcon size={15} />
                ) : (
                  <Edit3Icon size={15} />
                )}
              </button>
              <button onClick={() => handleDeleteBenefit(index)}>
                <Trash2 size={15} color="red" />
              </button>
            </li>
          ))}
          <li className="mb-2 flex items-center gap-2">
            <Input
              className="transition3 h-14 border-gray bg-gray"
              placeholder="Enter new benefit"
              type="text"
              defaultValue={newBenefit}
              onChange={(e) => setNewBenefit(e.target.value)} // Update the temporary state
            />
            <Button onClick={handleAddBenefit} className="text-white">
              Add
            </Button>
          </li>
        </ul>
     
        <span className="flex justify-end">
          <Button
            onClick={handleSave}
            className="mt-2 flex h-10 w-40 items-center justify-center gap-2 rounded-[10px] bg-green-500 px-3 text-white"
          >
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
