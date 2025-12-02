"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const variants = {
  default: "bg-sky-500 text-white hover:bg-sky-400",
  secondary: "bg-slate-800 text-slate-100 hover:bg-slate-700",
  outline: "border border-slate-800 text-slate-100 hover:bg-slate-900/60",
  ghost: "text-slate-300 hover:bg-slate-800/60"
};

type Variant = keyof typeof variants;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 disabled:opacity-60",
        variants[variant],
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";


