import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  onClear: () => void;
}

export function SearchPost({
  value,
  onChange,
  onSearch,
  onClear,
}: SearchProps) {
  return (
    <Field orientation="horizontal" className="gap-2">
      <div className="relative w-50">
        <Input
          placeholder="Search Post by ID..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />

        {value && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClear}
            type="button"
            className="absolute right-1 hover:bg-transparent cursor-pointer"
          >
            <X size={16} />
          </Button>
        )}
      </div>

      <Button onClick={onSearch} type="button" className="cursor-pointer">
        Search
      </Button>
    </Field>
  );
}
