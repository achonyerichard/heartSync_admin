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
      className={`rounded-xl px-4 py-6 shadow-lg ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
