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
      className={`rounded-md xl:rounded-xl px-2 xl:px-4 py-2 xl:py-6 shadow-lg ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
