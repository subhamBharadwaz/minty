import * as React from "react";
import { format, subDays } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn, formatDateRange } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { ChevronDown } from "lucide-react";

export const DateFilter = ({
  from,
  to,
  onDateChange,
}: {
  from: Date;
  to: Date;
  onDateChange: React.Dispatch<
    React.SetStateAction<{ from: string; to: string }>
  >;
}) => {
  const defaultTo = new Date();
  const defaultFrom = subDays(defaultTo, 30);

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: from ? new Date(from) : defaultFrom,
    to: to ? new Date(to) : defaultTo,
  });

  React.useEffect(() => {
    if (date?.from && date?.to) {
      onDateChange({
        from: format(date.from, "yyyy-MM-dd"),
        to: format(date.to, "yyyy-MM-dd"),
      });
    }
  }, [date, onDateChange]);

  return (
    <div className={cn("grid gap-2")}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 size-4" />
            <span>{formatDateRange({ from: date?.from, to: date?.to })}</span>
            <ChevronDown className="size-4 mr-0 ml-auto" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
