import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef(
  ({ className, maxLength, showCount = false, ...props }, ref) => {
    const [count, setCount] = React.useState(0);

    const handleInputChange = (event) => {
      setCount(event.target.value.length);
      if (props.onChange) {
        props.onChange(event);
      }
    };

    const handleKeyDown = (e) => {
        props.onKeyDown(e)
    };

    return (
      <div className="relative w-full">
        <textarea
          {...props}
          className={cn(
            "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          maxLength={maxLength}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        {showCount && (
          <div className="absolute bottom-[2px] right-3 text-xs text-muted-foreground mt-1 text-right">
            {count}/{maxLength || "∞"}
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
