"use client";

import * as React from "react";
// import { CalendarIcon } from "@radix-ui/react-icons";
import { CalendarIcon } from "lucide-react";

import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type Props = {
  date: Date | undefined;
  onChange?: (value: Date | undefined) => void;
  onInteractionOutside?: () => void;
};

export function DatePickerDemo({
  date,
  onChange,
  onInteractionOutside,
}: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "flex-row-btwn px-3 text-left font-normal sm:min-w-[130px]",
            !date && "text-muted-foreground",
          )}
        >
          {date ? format(date, "PPP") : <span>Pick a date</span>}
          <CalendarIcon className="ml-1.5 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto bg-white p-0"
        align="start"
        onInteractOutside={onInteractionOutside}
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
