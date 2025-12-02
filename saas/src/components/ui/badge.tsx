import { cn } from "@/lib/utils";

export function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-slate-800 px-3 py-0.5 text-xs font-medium uppercase tracking-wide text-slate-300",
        className
      )}
      {...props}
    />
  );
}


