import React from "react";

export const CustomCard = ({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <div
      className={`rounded-md xl:rounded-xl p-4 xl:p-5 shadow-lg ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
