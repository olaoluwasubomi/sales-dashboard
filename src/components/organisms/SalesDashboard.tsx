"use client";

import { useState } from "react";
import { YearSelector } from "@/components/molecules/YearSelector";
import { ThresholdFilter } from "@/components/molecules/ThresholdFilter";
import { StatCard } from "@/components/molecules/StatCard";
import { SalesChart } from "@/components/organisms/SalesChart";
import { useSalesData } from "@/hooks/useSalesData";
import {
  aggregateMonthlySales,
  aggregateCategorySales,
} from "@/lib/mock-sales-data";
import type { ChartType, SalesYear } from "@/types/sales";

const formatCurrency = (value: number) =>
  `$${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

export function SalesDashboard() {
  const [year, setYear] = useState<SalesYear>(2024);
  const [threshold, setThreshold] = useState(0);
  const [chartType, setChartType] = useState<ChartType>("bar");

  const { data, summary, loading, error } = useSalesData(year, threshold);

  const monthlyData = aggregateMonthlySales(data);
  const categoryData = aggregateCategorySales(data);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <YearSelector year={year} onChange={setYear} />
        <ThresholdFilter threshold={threshold} onChange={setThreshold} />
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-500">Loading sales data...</p>
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && summary && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Sales"
              value={formatCurrency(summary.totalSales)}
              subtitle={`Year ${year}`}
            />
            <StatCard
              title="Avg. Monthly Sales"
              value={formatCurrency(summary.averageMonthlySales)}
            />
            <StatCard
              title="Top Category"
              value={summary.topCategory}
            />
            <StatCard
              title="Records Above Threshold"
              value={summary.recordCount.toString()}
              subtitle={threshold > 0 ? `≥ ${formatCurrency(threshold)}` : "All records"}
            />
          </div>

          <SalesChart
            chartType={chartType}
            onChartTypeChange={setChartType}
            monthlyData={monthlyData}
            categoryData={categoryData}
            year={year}
          />
        </>
      )}
    </div>
  );
}
