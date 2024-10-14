import React from "react";

const CustomTitle = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <div className="mb-2 flex items-center gap-x-1.5 xl:mb-4 xl:gap-x-2.5">
      {children}
      <span className="text-base font-bold xl:text-[20px]">{title}</span>
    </div>
  );
};

export default CustomTitle;
