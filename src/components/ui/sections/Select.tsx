import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";

interface SelectDropdownProps {
  value: string;
  items: any[];
  isFetchingList: boolean;
  placeholder?: ReactNode;
  setValue: Dispatch<SetStateAction<any>>;
  itemStyle?: string;
  renderItem?: (item: any) => ReactNode;
  otherContent?: () => ReactNode;
}

// defaultValue={value || items?.[0]}

export default function SelectDropdown({
  value,
  placeholder,
  itemStyle,
  items,
  isFetchingList,
  setValue,
  renderItem,
  otherContent,
}: SelectDropdownProps) {
  return (
    <Select onValueChange={setValue}>
      <SelectTrigger className="w-full min-w-[180px]">
        <SelectValue placeholder={placeholder ?? "Select"} />
      </SelectTrigger>

      <SelectContent className="relative gap-3 bg-background">
        {isFetchingList ? (
          <span className="absolute inset-0 grid place-items-center">
            Loading...
          </span>
        ) : items.length > 0 ? (
          items?.map((item, idx) => (
            <SelectItem
              value={item?.name}
              key={idx}
              className={twMerge("row-flex !justify-start", itemStyle)}
            >
              {renderItem ? renderItem(item?.name) : item?.name}
            </SelectItem>
          ))
        ) : (
          <SelectItem value="no-item" className="row-flex text-center">
            No item
          </SelectItem>
        )}

        {otherContent && otherContent()}
      </SelectContent>
    </Select>
  );
}
