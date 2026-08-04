import type { TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className, ...props }: Props) {
  return (
    <textarea
      className={cn(
        "min-h-28 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none",
        "placeholder:text-muted-foreground",
        "focus:border-ring focus:ring-2 focus:ring-ring/20",
        className,
      )}
      {...props}
    />
  );
}
