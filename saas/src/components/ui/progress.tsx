import { cn } from "@/lib/utils";

type Props = {
  value: number;
  className?: string;
};

export function Progress({ value, className }: Props) {
  return (
    <div
      className={cn(
        "h-2 w-full overflow-hidden rounded-full bg-slate-800",
        className
      )}
    >
      <div
        className="h-full rounded-full bg-sky-500 transition-all"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}


