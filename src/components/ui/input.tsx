import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "px-4 py-2 rounded-xl w-full ouline-none border-none shadow-sm bg-muted",
        className
      )}
      {...props}
    />
  );
}

export { Input };
