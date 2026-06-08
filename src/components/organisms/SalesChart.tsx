"use client";

import { Card } from "@/components/atoms/Card";
import { ChartTypeSwitcher } from "@/components/molecules/ChartTypeSwitcher";
import { BarChart } from "@/components/organisms/charts/BarChart";
import { LineChart } from "@/components/organisms/charts/LineChart";
import { PieChart } from "@/components/organisms/charts/PieChart";
import type { ChartType } from "@/types/sales";

interface SalesChartProps {
  chartType: ChartType;
  onChartTypeChange: (type: ChartType) => void;
  monthlyData: { month: string; sales: number }[];
  categoryData: { category: string; sales: number }[];
  year: number;
}

export function SalesChart({
  chartType,
  onChartTypeChange,
  monthlyData,
  categoryData,
  year,
}: SalesChartProps) {
  const chartTitles: Record<ChartType, string> = {
    bar: `Monthly Sales — ${year}`,
    line: `Sales Trend — ${year}`,
    pie: `Sales by Category — ${year}`,
  };

  return (
    <Card
      title={chartTitles[chartType]}
      description="Switch between bar, line, and pie chart views"
    >
      <div className="mb-4">
        <ChartTypeSwitcher activeType={chartType} onChange={onChartTypeChange} />
      </div>
      {chartType === "bar" && <BarChart data={monthlyData} />}
      {chartType === "line" && <LineChart data={monthlyData} />}
      {chartType === "pie" && <PieChart data={categoryData} />}
    </Card>
  );
}
