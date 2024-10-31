"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CreateProductForm from "@/components/organisms/Marketplace/CreateProductForm";

const CreateProduct = () => {
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

  return (
    <Suspense fallback={<>loading...</>}>
      <CreateProductForm
        productName={productName}
        productCategory={productCategory}
        productColor={productColor}
        productDescription={productDescription}
        productId={productId}
        productImages={productImages}
        productStock={productStock}
        productPrice={productPrice}
        productMaterial={productMaterial}
        productSize={productSize}
      />
    </Suspense>
  );
};

export default CreateProduct;
