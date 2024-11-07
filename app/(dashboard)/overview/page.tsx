import Demographics from "@/components/organisms/Overview/Demographics/Demographics";
import UserAnalysis from "@/components/organisms/Overview/UserAnalysis/UserAnalysis";
import OrderAnalysis from "@/components/organisms/Overview/OrderAnalysis/OrderAnalysis";
import React from "react";

const Page = () => {
  return (
    <div className="">
      <UserAnalysis />
      <div className="my-6 xl:grid xl:grid-cols-7 gap-x-4">
        <Demographics />
        <OrderAnalysis />
      </div>
    </div>
  );
};

export default Page;
