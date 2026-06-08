import { NextRequest, NextResponse } from "next/server";
import {
  getSalesByYear,
  filterByThreshold,
} from "@/lib/mock-sales-data";
import type { SalesYear } from "@/types/sales";

const VALID_YEARS: SalesYear[] = [2022, 2023, 2024];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const yearParam = searchParams.get("year");
  const thresholdParam = searchParams.get("threshold");

  const year = Number(yearParam) as SalesYear;
  const threshold = Number(thresholdParam) || 0;

  if (!VALID_YEARS.includes(year)) {
    return NextResponse.json(
      { error: "Invalid year. Must be 2022, 2023, or 2024." },
      { status: 400 }
    );
  }

  const allRecords = getSalesByYear(year);
  const filtered = filterByThreshold(allRecords, threshold);

  const totalSales = filtered.reduce((sum, r) => sum + r.sales, 0);
  const months = new Set(filtered.map((r) => r.month));
  const averageMonthlySales =
    months.size > 0 ? Math.round(totalSales / months.size) : 0;

  const categoryTotals = filtered.reduce<Record<string, number>>((acc, r) => {
    acc[r.category] = (acc[r.category] ?? 0) + r.sales;
    return acc;
  }, {});

  const topCategory =
    Object.entries(categoryTotals).sort(([, a], [, b]) => b - a)[0]?.[0] ??
    "N/A";

  return NextResponse.json({
    data: filtered,
    summary: {
      totalSales,
      averageMonthlySales,
      topCategory,
      recordCount: filtered.length,
    },
    year,
    threshold,
  });
}
