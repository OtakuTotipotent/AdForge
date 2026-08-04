import type { SelectHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type Props = SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className, ...props }: Props) {
  return (
    <select
      className={cn(
        "h-10 w-full rounded-md border border-border bg-background px-3 text-sm",
        className,
      )}
      {...props}
    />
  );
}
