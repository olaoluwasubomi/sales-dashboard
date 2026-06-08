import type { SalesRecord, SalesYear } from "@/types/sales";

/**
 * Mock retail sales data inspired by Kaggle supermarket/retail datasets.
 * Categories: Electronics, Clothing, Groceries, Home & Garden, Sports
 * Regions: North, South, East, West, Central
 */
const CATEGORIES = [
  "Electronics",
  "Clothing",
  "Groceries",
  "Home & Garden",
  "Sports",
] as const;

const REGIONS = ["North", "South", "East", "West", "Central"] as const;

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

// Base monthly sales patterns per year (Kaggle-style seasonal retail trends)
const YEAR_MULTIPLIERS: Record<SalesYear, number> = {
  2022: 1.0,
  2023: 1.12,
  2024: 1.24,
};

const SEASONAL_FACTORS = [0.85, 0.78, 0.92, 0.95, 1.0, 1.05, 1.08, 1.02, 0.98, 1.1, 1.35, 1.45];

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generateSalesForYear(year: SalesYear): SalesRecord[] {
  const records: SalesRecord[] = [];
  let id = 1;

  MONTHS.forEach((month, monthIndex) => {
    CATEGORIES.forEach((category, catIndex) => {
      REGIONS.forEach((region, regionIndex) => {
        const seed = year * 1000 + monthIndex * 100 + catIndex * 10 + regionIndex;
        const base = 12000 + catIndex * 3500 + regionIndex * 1800;
        const seasonal = SEASONAL_FACTORS[monthIndex];
        const noise = 0.85 + seededRandom(seed) * 0.3;
        const sales = Math.round(
          base * seasonal * YEAR_MULTIPLIERS[year] * noise
        );
        const units = Math.round(sales / (45 + catIndex * 12));

        records.push({
          id: `${year}-${id++}`,
          year,
          month,
          category,
          region,
          sales,
          units,
        });
      });
    });
  });

  return records;
}

const salesCache: Record<SalesYear, SalesRecord[]> = {
  2022: generateSalesForYear(2022),
  2023: generateSalesForYear(2023),
  2024: generateSalesForYear(2024),
};

export function getSalesByYear(year: SalesYear): SalesRecord[] {
  return salesCache[year];
}

export function getAllSales(): SalesRecord[] {
  return [...salesCache[2022], ...salesCache[2023], ...salesCache[2024]];
}

export function filterByThreshold(
  records: SalesRecord[],
  threshold: number
): SalesRecord[] {
  return records.filter((r) => r.sales >= threshold);
}

export function aggregateMonthlySales(records: SalesRecord[]) {
  const monthlyMap = new Map<string, number>();

  records.forEach((record) => {
    const current = monthlyMap.get(record.month) ?? 0;
    monthlyMap.set(record.month, current + record.sales);
  });

  return MONTHS.map((month) => ({
    month,
    sales: monthlyMap.get(month) ?? 0,
  }));
}

export function aggregateCategorySales(records: SalesRecord[]) {
  const categoryMap = new Map<string, number>();

  records.forEach((record) => {
    const current = categoryMap.get(record.category) ?? 0;
    categoryMap.set(record.category, current + record.sales);
  });

  return CATEGORIES.map((category) => ({
    category,
    sales: categoryMap.get(category) ?? 0,
  }));
}

export { CATEGORIES, REGIONS, MONTHS };
