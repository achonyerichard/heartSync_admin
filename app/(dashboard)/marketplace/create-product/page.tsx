"use client";

import { Suspense } from "react";
import CreateProductForm from "@/components/organisms/Marketplace/CreateProductForm";

const CreateProduct = () => {
  return (
    <Suspense fallback={<>loading...</>}>
      <CreateProductForm />
    </Suspense>
  );
};

export default CreateProduct;
