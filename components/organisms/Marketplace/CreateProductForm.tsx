"use client";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import CustomTitle from "@/components/atoms/CustomTitle/CustomTitle";
import { useRouter, useSearchParams } from "next/navigation";
import { useFetch, useFormDataMutate, useMutate } from "@/hooks/useHttpRequest";
import Select from "react-select";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { colors } from "@/data/colors";
import { toast } from "react-toastify";

const CreateProductForm = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  const productName = searchParams.get("name");
  const productDescription = searchParams.get("description");
  const productPrice = searchParams.get("price");
  const productStock = searchParams.get("stock");
  const productImages = searchParams.get("imagesUrl")?.split("!");
  const productCategory = searchParams
    .get("category")
    ?.split("!")
    .map((cat) => cat.replace("-", " ").replace("%27", "'"));
  const productSize = searchParams.get("size")?.split("!");
  const productColor = searchParams.get("color")?.split("!");
  const productMaterial = searchParams.get("productMaterial");
  const colorArray = Object.keys(colors).map((color) => ({
    label: color,
    value: color,
  }));
  const router = useRouter();
  const [details, setDetails] = useState<{
    name: string;
    description: string;
    stock: number;
    price: number;
    image: File[];
    category: string[];
    color: string[];
    productMaterial: string;
    size: string[];
  }>({
    name: productName ? productName : "",
    description: productDescription ? productDescription : "",
    stock: productStock ? Number(productStock) : 0,
    price: productPrice ? Number(productPrice) : 0,
    image: [],
    category: productCategory ? productCategory : [],
    color: productColor ? productColor : [],
    productMaterial: productMaterial ? productMaterial : "",
    size: productSize ? productSize : [],
  });
  const [preview, setPreview] = useState<string[]>(
    productImages ? productImages : [],
  );
  const [categories, setCategories] = useState<any>([]);
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const arr: File[] = [];
    const prev: string[] = [];
    if (e.target.files) {
      for (let i = 0; i < e.target.files.length; i++) {
        arr.push(e.target.files[i]);
        prev.push(URL.createObjectURL(e.target.files[i]));
      }
      setDetails((prev) => ({ ...prev, [e.target.name]: [...arr] }));
      setPreview(prev);
    }
  };

  const {} = useFetch(
    "get",
    "category/fetch",
    (data) => {
      const selects = data.data.data.map((category: any) => ({
        value: category.name,
        label: category.name,
      }));
      setCategories(selects);
    },
    undefined,
  );

  const { mutate: create } = useFormDataMutate(
    "post",
    "products/create",
    () => {
      toast.success("Product created successfully");
      router.push("/marketplace");
    },
    undefined,
    () => {
      toast.error("Could not create product");
    },
  );

  const { mutate: edit } = useMutate(
    "patch",
    `products/updateProduct/${productId}`,
    () => {
      toast.success("Product edited successfully");
      router.push("/marketplace");
    },
    undefined,
    () => {
      toast.error("Could not edit product");
    },
  );

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const {
      name,
      description,
      stock,
      price,
      image,
      category,
      color,
      productMaterial,
      size,
    } = details;
    if (
      name &&
      description &&
      stock &&
      price &&
      image.length > 0 &&
      category.length > 0 &&
      color.length > 0 &&
      productMaterial &&
      size &&
      !productId
    ) {
      const form = new FormData();
      form.append("name", name);
      form.append("description", description);
      form.append("stock", stock.toString());
      form.append("price", price.toString());

      //form.append("size", size);
      form.append("productMaterial", productMaterial);
      image.forEach((img) => form.append("photos", img));
      size.forEach((sze) => form.append("size", sze));
      category.forEach((category) => form.append("category", category));
      color.forEach((color) => form.append("color", color));
      create(form);
    } else if (productId) {
      edit(details);
    }
  };

  return (
    <div className="relative w-full rounded-xl bg-white p-4 xl:p-6">
      {" "}
      <CustomTitle title="Gifts">
        <svg
          width="32"
          height="33"
          viewBox="0 0 32 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M27 9.00006H23.7575C24.2215 8.32517 24.4794 7.53004 24.5 6.71131C24.5185 6.0876 24.4093 5.46669 24.1791 4.88673C23.9489 4.30676 23.6025 3.77999 23.1613 3.33877C22.7201 2.89754 22.1933 2.55119 21.6133 2.32097C21.0334 2.09076 20.4125 1.98155 19.7887 2.00006C19.2127 2.01236 18.6453 2.14362 18.1224 2.38562C17.5995 2.62762 17.1322 2.97512 16.75 3.40631C16.4681 3.7279 16.217 4.07526 16 4.44381C15.783 4.07526 15.5319 3.7279 15.25 3.40631C14.8678 2.97512 14.4005 2.62762 13.8776 2.38562C13.3547 2.14362 12.7873 2.01236 12.2113 2.00006C11.5875 1.98155 10.9666 2.09076 10.3867 2.32097C9.8067 2.55119 9.27993 2.89754 8.83871 3.33877C8.39748 3.77999 8.05113 4.30676 7.82091 4.88673C7.5907 5.46669 7.48149 6.0876 7.5 6.71131C7.52058 7.53004 7.77853 8.32517 8.2425 9.00006H5C4.33696 9.00006 3.70107 9.26345 3.23223 9.73229C2.76339 10.2011 2.5 10.837 2.5 11.5001V15.5001C2.49988 16.0764 2.69889 16.6351 3.06335 17.0815C3.4278 17.528 3.93532 17.8348 4.5 17.9501V25.5001C4.5 26.1631 4.76339 26.799 5.23223 27.2678C5.70107 27.7367 6.33696 28.0001 7 28.0001H25C25.663 28.0001 26.2989 27.7367 26.7678 27.2678C27.2366 26.799 27.5 26.1631 27.5 25.5001V17.9501C28.0647 17.8348 28.5722 17.528 28.9367 17.0815C29.3011 16.6351 29.5001 16.0764 29.5 15.5001V11.5001C29.5 10.837 29.2366 10.2011 28.7678 9.73229C28.2989 9.26345 27.663 9.00006 27 9.00006ZM26.5 15.0001H17.5V12.0001H26.5V15.0001ZM19 5.39631C19.1106 5.2735 19.2455 5.17491 19.3961 5.10671C19.5467 5.03852 19.7097 5.00221 19.875 5.00006H19.9188C20.1303 4.99946 20.3398 5.04141 20.5348 5.12342C20.7298 5.20543 20.9063 5.32581 21.0538 5.47742C21.2013 5.62902 21.3168 5.80875 21.3935 6.0059C21.4701 6.20306 21.5064 6.41362 21.5 6.62506C21.4979 6.79035 21.4615 6.9534 21.3933 7.10398C21.3252 7.25456 21.2266 7.38941 21.1038 7.50006C20.2413 8.26506 18.8225 8.65756 17.65 8.84506C17.8375 7.67756 18.23 6.25881 19 5.39631ZM10.9625 5.46256C11.2592 5.16903 11.6589 5.00306 12.0763 5.00006H12.125C12.2903 5.00221 12.4533 5.03852 12.6039 5.10671C12.7545 5.17491 12.8894 5.2735 13 5.39631C13.765 6.25881 14.1575 7.67631 14.3438 8.84756C13.1812 8.65881 11.75 8.26631 10.8962 7.50006C10.7734 7.38941 10.6748 7.25456 10.6067 7.10398C10.5385 6.9534 10.5022 6.79035 10.5 6.62506C10.4945 6.41008 10.5326 6.19622 10.6121 5.99641C10.6916 5.79659 10.8108 5.61498 10.9625 5.46256ZM5.5 12.0001H14.5V15.0001H5.5V12.0001ZM7.5 18.0001H14.5V25.0001H7.5V18.0001ZM17.5 25.0001V18.0001H24.5V25.0001H17.5Z"
            fill="#F75555"
          />
        </svg>
      </CustomTitle>
      <form onSubmit={handleSubmit} className="">
        <div className="flex gap-x-10 max-xl:flex-col">
          <div className="max-xl:order-2 xl:w-3/5">
            <div className="mb-6">
              <Label>Gift Name</Label>
              <Input
                className="transition3 mt-2 h-10 rounded-lg border-gray bg-gray"
                placeholder="Adidas Ultra Boost"
                name="name"
                onChange={handleInputChange}
                value={details.name}
              />
            </div>
            <div className="mb-6">
              {" "}
              <Label>Gift Description</Label>
              <Textarea
                className="transition3 mt-2 h-10 rounded-lg border-gray bg-gray"
                name="description"
                onChange={handleInputChange}
                value={details.description}
              />
            </div>
            <div className="mb-6">
              <Label>Gift Color</Label>
              <Select
                placeholder="Select Color"
                classNames={{
                  control: () =>
                    "border border-gray-300 rounded-2xl dark:bg-black text-white",
                  input: () =>
                    " w-full  px-5  md:text-sm rounded-md   dark:placeholder:text-gray-100 dark:text-white text-black",
                  menu: () => "dark:bg-black dark:text-white hover:text-black",
                  singleValue: () => "text-black",
                }}
                onChange={(prop) => {
                  const values = prop
                    ? prop.map((option: any) => option.value)
                    : [];

                  setDetails((prev) => ({ ...prev, color: values }));
                }}
                options={colorArray}
                isMulti
              />
            </div>
            <div className="mb-6">
              <Label>Gift Material</Label>
              <Input
                className="transition3 mt-2 h-10 rounded-lg border-gray bg-gray"
                placeholder="Adidas Ultra Boost"
                name="productMaterial"
                onChange={handleInputChange}
                value={details.productMaterial}
              />
            </div>
            <div className="mb-6">
              <Label>Gift Size</Label>
              <Select
                placeholder="Select Size"
                classNames={{
                  control: () =>
                    "border border-gray-300 rounded-2xl dark:bg-black text-white",
                  input: () =>
                    " w-full  px-5  md:text-sm rounded-md   dark:placeholder:text-gray-100 dark:text-white text-black",
                  menu: () => "dark:bg-black dark:text-white hover:text-black",
                  singleValue: () => "text-black",
                }}
                onChange={(prop) => {
                  const values = prop
                    ? prop.map((option: any) => option.value)
                    : [];

                  setDetails((prev) => ({ ...prev, size: values }));
                }}
                options={["XS", "SM", "MD", "LG", "XL", "2XL", "3XL"].map(
                  (size) => ({ value: size, label: size }),
                )}
                isMulti
              />
            </div>
            <div className="mb-6">
              <label className="text-xs font-bold text-black"> Category:</label>

              <Select
                placeholder="Select Category"
                classNames={{
                  control: () =>
                    "border border-gray-300 rounded-2xl dark:bg-black text-white",
                  input: () =>
                    " w-full  px-5  md:text-sm rounded-md   dark:placeholder:text-gray-100 dark:text-white text-black",
                  menu: () => "dark:bg-black dark:text-white hover:text-black",
                  singleValue: () => "text-black",
                }}
                onChange={(prop) => {
                  const values = prop
                    ? prop.map((option: any) => option.value)
                    : [];

                  setDetails((prev) => ({ ...prev, category: values }));
                }}
                options={categories}
                isMulti
              />
            </div>
            <div className="mb-6">
              <Label>Stock Quantity</Label>
              <Input
                className="transition3 mt-2 h-10 rounded-lg border-gray bg-gray"
                placeholder="21"
                type="number"
                name="stock"
                onChange={handleInputChange}
                value={details.stock}
              />
            </div>
            <div className="mb-6">
              <Label>Price</Label>
              <Input
                className="transition3 mt-2 h-10 rounded-lg border-gray bg-gray"
                placeholder="500"
                type="number"
                name="price"
                onChange={handleInputChange}
                value={details.price}
              />
            </div>
          </div>
          <div className="max-xl:order1 max-xl:mb-5 xl:w-2/5">
            {" "}
            <Label>Gift Description</Label>
            <label
              className={`relative cursor-pointer rounded-md border-2 ${preview ? "" : "flex flex-col items-center justify-center gap-1 border-dashed p-6"}`}
            >
              {preview ? (
                <>
                  {" "}
                  <Carousel
                    opts={{
                      align: "start",
                      loop: true,
                    }}
                  >
                    <CarouselContent>
                      {" "}
                      {preview.map(
                        (prev: string, index: number, array: string[]) => (
                          <CarouselItem className="relative" key={index}>
                            {" "}
                            <svg
                              width="48"
                              height="48"
                              viewBox="0 0 48 48"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="absolute top-7 z-10 translate-x-5 cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                const preview = array.filter(
                                  (_, i: number) => i !== index,
                                );
                                const images = details.image.filter(
                                  (_, i: number) => i !== index,
                                );
                                setDetails((prev) => ({
                                  ...prev,
                                  image: images,
                                }));
                                setPreview(preview);
                              }}
                            >
                              <path
                                d="M24 4.5C20.1433 4.5 16.3731 5.64366 13.1664 7.78634C9.95963 9.92903 7.46027 12.9745 5.98436 16.5377C4.50845 20.1008 4.12228 24.0216 4.8747 27.8043C5.62711 31.5869 7.4843 35.0615 10.2114 37.7886C12.9386 40.5157 16.4131 42.3729 20.1957 43.1253C23.9784 43.8777 27.8992 43.4916 31.4623 42.0156C35.0255 40.5397 38.071 38.0404 40.2137 34.8336C42.3564 31.6269 43.5 27.8567 43.5 24C43.4945 18.83 41.4383 13.8732 37.7826 10.2174C34.1268 6.56167 29.1701 4.50546 24 4.5ZM31.0613 28.9387C31.2006 29.0781 31.3112 29.2436 31.3866 29.4257C31.462 29.6077 31.5008 29.8029 31.5008 30C31.5008 30.1971 31.462 30.3923 31.3866 30.5743C31.3112 30.7564 31.2006 30.9219 31.0613 31.0613C30.9219 31.2006 30.7564 31.3112 30.5744 31.3866C30.3923 31.462 30.1971 31.5008 30 31.5008C29.8029 31.5008 29.6078 31.462 29.4257 31.3866C29.2436 31.3112 29.0781 31.2006 28.9388 31.0613L24 26.1206L19.0613 31.0613C18.9219 31.2006 18.7564 31.3112 18.5744 31.3866C18.3923 31.462 18.1971 31.5008 18 31.5008C17.8029 31.5008 17.6078 31.462 17.4257 31.3866C17.2436 31.3112 17.0781 31.2006 16.9388 31.0613C16.7994 30.9219 16.6888 30.7564 16.6134 30.5743C16.538 30.3923 16.4992 30.1971 16.4992 30C16.4992 29.8029 16.538 29.6077 16.6134 29.4257C16.6888 29.2436 16.7994 29.0781 16.9388 28.9387L21.8794 24L16.9388 19.0613C16.6573 18.7798 16.4992 18.398 16.4992 18C16.4992 17.602 16.6573 17.2202 16.9388 16.9387C17.2202 16.6573 17.602 16.4992 18 16.4992C18.3981 16.4992 18.7798 16.6573 19.0613 16.9387L24 21.8794L28.9388 16.9387C29.0781 16.7994 29.2436 16.6888 29.4257 16.6134C29.6078 16.538 29.8029 16.4992 30 16.4992C30.1971 16.4992 30.3923 16.538 30.5744 16.6134C30.7564 16.6888 30.9219 16.7994 31.0613 16.9387C31.2006 17.0781 31.3112 17.2436 31.3866 17.4257C31.462 17.6077 31.5008 17.8029 31.5008 18C31.5008 18.1971 31.462 18.3923 31.3866 18.5743C31.3112 18.7564 31.2006 18.9219 31.0613 19.0613L26.1206 24L31.0613 28.9387Z"
                                fill="#F75555"
                              />
                            </svg>
                            <Image
                              src={prev}
                              alt="gift image"
                              className="h-auto max-h-[500px] w-full object-cover"
                              width={500}
                              height={500}
                            />
                          </CarouselItem>
                        ),
                      )}
                    </CarouselContent>{" "}
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </>
              ) : (
                <>
                  {" "}
                  <svg
                    width="65"
                    height="64"
                    viewBox="0 0 65 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M54.5 10.5H10.5C9.57174 10.5 8.6815 10.8687 8.02513 11.5251C7.36875 12.1815 7 13.0717 7 14V50C7 50.9283 7.36875 51.8185 8.02513 52.4749C8.6815 53.1312 9.57174 53.5 10.5 53.5H54.5C55.4283 53.5 56.3185 53.1312 56.9749 52.4749C57.6312 51.8185 58 50.9283 58 50V14C58 13.0717 57.6312 12.1815 56.9749 11.5251C56.3185 10.8687 55.4283 10.5 54.5 10.5ZM10.5 13.5H54.5C54.6326 13.5 54.7598 13.5527 54.8536 13.6464C54.9473 13.7402 55 13.8674 55 14V42.375L46.975 34.35C46.3154 33.6996 45.4263 33.335 44.5 33.335C43.5737 33.335 42.6846 33.6996 42.025 34.35L36.85 39.525C36.8055 39.5735 36.7514 39.6122 36.6912 39.6387C36.6309 39.6652 36.5658 39.6789 36.5 39.6789C36.4342 39.6789 36.3691 39.6652 36.3088 39.6387C36.2486 39.6122 36.1945 39.5735 36.15 39.525L24.975 28.35C24.3154 27.6996 23.4263 27.335 22.5 27.335C21.5737 27.335 20.6846 27.6996 20.025 28.35L10 38.375V14C10 13.8674 10.0527 13.7402 10.1464 13.6464C10.2402 13.5527 10.3674 13.5 10.5 13.5ZM54.5 50.5H10.5C10.3674 50.5 10.2402 50.4473 10.1464 50.3536C10.0527 50.2598 10 50.1326 10 50V42.625L22.15 30.475C22.1945 30.4265 22.2486 30.3878 22.3088 30.3613C22.3691 30.3348 22.4342 30.3211 22.5 30.3211C22.5658 30.3211 22.6309 30.3348 22.6912 30.3613C22.7514 30.3878 22.8055 30.4265 22.85 30.475L34.025 41.65C34.6846 42.3004 35.5737 42.665 36.5 42.665C37.4263 42.665 38.3154 42.3004 38.975 41.65L44.15 36.475C44.1945 36.4265 44.2486 36.3878 44.3088 36.3613C44.3691 36.3348 44.4342 36.3211 44.5 36.3211C44.5658 36.3211 44.6309 36.3348 44.6912 36.3613C44.7514 36.3878 44.8055 36.4265 44.85 36.475L55 46.625V50C55 50.1326 54.9473 50.2598 54.8536 50.3536C54.7598 50.4473 54.6326 50.5 54.5 50.5ZM37.725 26.775C37.4922 26.5422 37.3081 26.2653 37.1836 25.9606C37.0591 25.6558 36.9967 25.3292 37 25C37 24.337 37.2634 23.7011 37.7322 23.2322C38.2011 22.7634 38.837 22.5 39.5 22.5C40.163 22.5 40.7989 22.7634 41.2678 23.2322C41.7366 23.7011 42 24.337 42 25C42 25.663 41.7366 26.2989 41.2678 26.7678C40.7989 27.2366 40.163 27.5 39.5 27.5C39.1708 27.5033 38.8442 27.4409 38.5394 27.3164C38.2347 27.1919 37.9578 27.0078 37.725 26.775Z"
                      fill="#4A69E2"
                    />
                  </svg>
                  <p className="text-center text-xs text-lightgray">
                    Drop your image here or browse <br />
                    .jpeg and .png are alloweed
                  </p>{" "}
                  <input
                    type="file"
                    className="absolute cursor-pointer opacity-0"
                    onChange={handleFileChange}
                    name="image"
                    multiple
                  />
                </>
              )}
            </label>
          </div>
        </div>
        <div className="flex justify-center gap-x-3">
          {" "}
          <Button
            variant="default"
            type="submit"
            className="max-xl:w-1/2 xl:min-w-[100px]"
          >
            {productId ? "Edit" : " Add"}
          </Button>{" "}
          <Button
            variant={"outline"}
            type="button"
            onClick={() => router.back()}
            className="max-xl:w-1/2 xl:min-w-[100px]"
          >
            Cancel
          </Button>
        </div>{" "}
      </form>
    </div>
  );
};

export default CreateProductForm;
