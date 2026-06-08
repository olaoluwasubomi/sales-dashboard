"use client";

import { Select } from "@/components/atoms/Select";
import type { SalesYear } from "@/types/sales";

interface YearSelectorProps {
  year: SalesYear;
  onChange: (year: SalesYear) => void;
}

const YEAR_OPTIONS = [
  { value: 2024, label: "2024" },
  { value: 2023, label: "2023" },
  { value: 2022, label: "2022" },
];

export function YearSelector({ year, onChange }: YearSelectorProps) {
  return (
    <Select
      label="Sales Year"
      value={year}
      options={YEAR_OPTIONS}
      onChange={(e) => onChange(Number(e.target.value) as SalesYear)}
    />
  );
}
