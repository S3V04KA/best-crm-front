import React, { useState, useEffect, useRef } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp, Search } from "lucide-react";
import { cn } from "@/utils/cn";

export interface SearchableSelectProps extends SelectPrimitive.SelectProps {
  children: React.ReactNode;
  searchPlaceholder?: string;
}

export interface SelectTriggerProps extends SelectPrimitive.SelectTriggerProps {
  children: React.ReactNode;
}

export type SelectValueProps = SelectPrimitive.SelectValueProps;

export interface SelectContentProps extends SelectPrimitive.SelectContentProps {
  children: React.ReactNode;
  searchPlaceholder?: string;
}

export interface SelectItemProps extends SelectPrimitive.SelectItemProps {
  children: React.ReactNode;
}

export interface SelectGroupProps extends SelectPrimitive.SelectGroupProps {
  children: React.ReactNode;
}

export interface SelectLabelProps extends SelectPrimitive.SelectLabelProps {
  children: React.ReactNode;
}

export type SelectSeparatorProps = SelectPrimitive.SelectSeparatorProps;

const SearchableSelect = SelectPrimitive.Root;

const SearchableSelectGroup = SelectPrimitive.Group;

const SearchableSelectValue = SelectPrimitive.Value;

const SearchableSelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      "dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 dark:placeholder:text-gray-400 dark:ring-offset-gray-900",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));

SearchableSelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SearchableSelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));

SearchableSelectScrollUpButton.displayName =
  SelectPrimitive.ScrollUpButton.displayName;

const SearchableSelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));

SearchableSelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SearchableSelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  SelectContentProps
>(
  (
    {
      className,
      children,
      position = "popper",
      searchPlaceholder = "Search...",
      ...props
    },
    ref
  ) => {
    const [searchTerm, setSearchTerm] = useState("");
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Focus the search input when the content opens
    useEffect(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, []);

    // Filter children based on search term
    const filteredChildren = React.Children.toArray(children).filter(
      (child) => {
        if (!React.isValidElement<SelectItemProps>(child)) {
          return false;
        }
        if (child.type === SelectPrimitive.Item) {
          if (!child.props.children) {
            return false;
          }
          const childText =
            typeof child.props.children === "string"
              ? child.props.children.toLowerCase()
              : child.props.children?.toString().toLowerCase() || "";
          return childText.includes(searchTerm.toLowerCase());
        }
        return true;
      }
    );

    return (
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          ref={ref}
          className={cn(
            "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white text-gray-950 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            position === "popper" &&
              "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
            "dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700",
            className
          )}
          position={position}
          {...props}
        >
          <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 p-2 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={cn(
                  "flex h-8 w-full rounded-md bg-gray-50 px-8 py-1 text-sm placeholder:text-gray-500 focus:outline-none",
                  "dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-400"
                )}
                ref={searchInputRef}
              />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
            </div>
          </div>
          <SearchableSelectScrollUpButton />
          <SelectPrimitive.Viewport
            className={cn(
              "p-1",
              position === "popper" &&
                "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
            )}
          >
            {filteredChildren}
          </SelectPrimitive.Viewport>
          <SearchableSelectScrollDownButton />
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    );
  }
);

SearchableSelectContent.displayName = SelectPrimitive.Content.displayName;

const SearchableSelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  SelectLabelProps
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(
      "py-1.5 pl-8 pr-2 text-sm font-semibold",
      "dark:text-gray-300",
      className
    )}
    {...props}
  />
));

SearchableSelectLabel.displayName = SelectPrimitive.Label.displayName;

const SearchableSelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  SelectItemProps
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      "dark:text-gray-100 dark:focus:bg-gray-800",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));

SearchableSelectItem.displayName = SelectPrimitive.Item.displayName;

const SearchableSelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  SelectSeparatorProps
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-gray-100", "dark:bg-gray-800", className)}
    {...props}
  />
));

SearchableSelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  SearchableSelect,
  SearchableSelectGroup,
  SearchableSelectValue,
  SearchableSelectTrigger,
  SearchableSelectContent,
  SearchableSelectLabel,
  SearchableSelectItem,
  SearchableSelectSeparator,
  SearchableSelectScrollUpButton,
  SearchableSelectScrollDownButton,
};
