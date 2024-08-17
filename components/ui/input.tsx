import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  message?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, message, ...props }, ref) => {
    return (
      <div className="relative grow">
        <input
          type={type}
          className={cn(
            " flex w-full rounded-2xl border border-transparent bg-white px-3 py-2 text-sm outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-black disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />
        <span className="absolute mt-1 -bottom-4 text-xs text-primary ml-3">{message}</span>
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
