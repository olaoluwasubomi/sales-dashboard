"use client";

import { Button } from "@/components/atoms/Button";
import type { ChartType } from "@/types/sales";

interface ChartTypeSwitcherProps {
  activeType: ChartType;
  onChange: (type: ChartType) => void;
}

const CHART_TYPES: { type: ChartType; label: string }[] = [
  { type: "bar", label: "Bar" },
  { type: "line", label: "Line" },
  { type: "pie", label: "Pie" },
];

export function ChartTypeSwitcher({
  activeType,
  onChange,
}: ChartTypeSwitcherProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {CHART_TYPES.map(({ type, label }) => (
        <Button
          key={type}
          variant={activeType === type ? "primary" : "secondary"}
          size="sm"
          onClick={() => onChange(type)}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}
