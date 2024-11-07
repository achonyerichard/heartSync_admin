import NavBar from "@/components/molecules/NavBar/NavBar";
import SideMenu from "@/components/molecules/SideMenu/SideMenu";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex font-urbanist">
      <SideMenu />
      <section className="w-full lg:grow">
        <NavBar />
        <div className="mx-auto max-w-[1728px] overflow-hidden px-5 py-3 xl:px-9 xl:py-6">
          {children}
        </div>
      </section>
    </div>
  );
};

export default layout;
