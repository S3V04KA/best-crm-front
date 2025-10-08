import React, { useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { Loader2 } from "lucide-react";

export interface PDFUploadButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "destructive" | "ghost";
  size?: "xs" | "sm" | "md" | "lg";
  loading?: boolean;
  onFileSelect?: (file: File | null) => void;
}

const buttonVariants = {
  primary:
    "bg-primary-500 hover:bg-primary-600 text-white shadow-sm hover:shadow-md",
  secondary:
    "bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 shadow-sm hover:shadow-md dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-800",
  destructive:
    "bg-destructive-500 hover:bg-destructive-600 text-white shadow-sm hover:shadow-md",
  ghost:
    "hover:bg-gray-100 text-gray-700 dark:text-gray-100 dark:hover:bg-gray-800",
};

const buttonSizes = {
  xs: "px-2 py-1 text-xs",
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

export const PDFUploadButton = React.forwardRef<
  HTMLButtonElement,
  PDFUploadButtonProps
>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      onFileSelect,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState<string | null>(null);

    const handleClick = () => {
      inputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file && file.type === "application/pdf") {
        setFileName(file.name);
        onFileSelect?.(file);
      } else {
        setFileName(null);
        onFileSelect?.(null);
      }
    };

    return (
      <div className="flex items-center gap-2">
        <input
          type="file"
          accept="application/pdf"
          className="hidden"
          ref={inputRef}
          onChange={handleFileChange}
        />
        <button
          className={cn(
            "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:focus:ring-offset-gray-900",
            buttonVariants[variant],
            buttonSizes[size],
            className
          )}
          ref={ref}
          disabled={loading}
          onClick={handleClick}
          {...props}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {fileName ? "Поменять PDF" : "Загрузить PDF"}
        </button>
        {fileName && (
          <span className="text-sm text-gray-600 dark:text-gray-300 truncate max-w-[200px]">
            {fileName}
          </span>
        )}
      </div>
    );
  }
);

PDFUploadButton.displayName = "PDFUploadButton";
