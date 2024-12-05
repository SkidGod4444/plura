import * as React from "react";
import { ChangeEvent, useRef } from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
      const textareaRef = useRef<HTMLTextAreaElement>(null);
      const defaultRows = 1;
      const maxRows = 3; 

      const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = e.target;
        textarea.style.height = "auto";

        const style = window.getComputedStyle(textarea);
        const borderHeight =
          parseInt(style.borderTopWidth) + parseInt(style.borderBottomWidth);
        const paddingHeight =
          parseInt(style.paddingTop) + parseInt(style.paddingBottom);

        const lineHeight = parseInt(style.lineHeight);
        const maxHeight = maxRows
          ? lineHeight * maxRows + borderHeight + paddingHeight
          : Infinity;

        const newHeight = Math.min(
          textarea.scrollHeight + borderHeight,
          maxHeight
        );

        textarea.style.height = `${newHeight}px`;
      };
    return (
      <textarea
        className={cn(
          "flex min-h-9 w-full rounded-md  border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={textareaRef}
        onChange={handleInput}
        rows={defaultRows}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
