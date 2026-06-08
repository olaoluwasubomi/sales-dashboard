"use client";

import { Input } from "@/components/atoms/Input";

interface ThresholdFilterProps {
  threshold: number;
  onChange: (threshold: number) => void;
}

export function ThresholdFilter({ threshold, onChange }: ThresholdFilterProps) {
  return (
    <Input
      label="Sales Threshold ($)"
      type="number"
      min={0}
      step={1000}
      value={threshold}
      onChange={(e) => onChange(Number(e.target.value) || 0)}
      placeholder="e.g. 15000"
    />
  );
}
