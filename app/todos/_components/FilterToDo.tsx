"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "@/types/task.type";

interface FilterProps {
  value: Filter;
  onChange: (value: Filter) => void;
}

const FilterToDo = ({ value, onChange }: FilterProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-50">
        <SelectValue placeholder="Filter" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        <SelectItem value="completed">Completed</SelectItem>
        <SelectItem value="pending">Pending</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default FilterToDo;
