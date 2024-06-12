"use client";

import React, { useMemo } from "react";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "@/lib/utils";

export type VirtualizedSelectOption = {
  textValue: string;
  key: string;
  index: number;
};
export interface VirtualizedSelectProps {
  options: Map<string, VirtualizedSelectOption>;
  value: string;
  onValueChange?: (v: string) => void;
}

export const VirtualizedSelect = ({
  options,
  value = "",
  onValueChange,
}: VirtualizedSelectProps) => {
  const data = useMemo(() => {
    const entries = options.entries();
    return [...(entries as unknown as [string, VirtualizedSelectOption][])].map(
      ([_, value]) => value
    );
  }, [options]);

  const [scrollParent, setScrollParent] = React.useState<HTMLElement>();
  const [localValue, setLocalValue] = React.useState(value);
  const virtuoso = React.useRef<VirtuosoHandle>(null);
  return (
    <Select
      value={localValue}
      onValueChange={(v) => {
        setLocalValue(v);
        if (onValueChange) onValueChange(v);
      }}
      open
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select item">
          {options.get(localValue)?.textValue ?? ""}
        </SelectValue>
      </SelectTrigger>
      <SelectContent
        onKeyDown={(e: KeyboardEvent) => {
          // WIP Type ahead for alphabetical keyboard nav
          const index = data.findIndex((v) => v.textValue.indexOf(e.key) === 0);
          //virtuoso.current?.scrollToIndex(index);
        }}
      >
        {/* <SelectViewport
          ref={(r) => {
            // Set state needed to rerender Virtuoso
            if (r) setScrollParent(r);
          }}
          style={{ width: "200px" }}
          onKeyDown={(e) => {}}
        > */}
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            // position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          )}
          ref={(r) => {
            // Set state needed to rerender Virtuoso
            if (r) setScrollParent(r);
          }}
        >
          <SelectGroup>
            <Virtuoso
              ref={virtuoso}
              data={data}
              initialTopMostItemIndex={{
                index: options.get(localValue)?.index ?? 0,
                align: "center",
                behavior: "auto",
              }}
              itemContent={(_, item) => {
                return (
                  <SelectItem key={item.key} value={item.key}>
                    {item.textValue}
                  </SelectItem>
                );
              }}
              customScrollParent={scrollParent}
            />
          </SelectGroup>
        </SelectPrimitive.Viewport>

        {/* </SelectViewport> */}
      </SelectContent>
    </Select>
  );
};
