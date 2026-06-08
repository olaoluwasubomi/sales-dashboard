export type SalesYear = 2022 | 2023 | 2024;

export type ChartType = "bar" | "line" | "pie";

export interface MonthlySale {
  month: string;
  sales: number;
  category: string;
  region: string;
}

export interface SalesRecord {
  id: string;
  year: SalesYear;
  month: string;
  category: string;
  region: string;
  sales: number;
  units: number;
}

export interface SalesSummary {
  year: SalesYear;
  totalSales: number;
  averageMonthlySales: number;
  topCategory: string;
  records: SalesRecord[];
}

export interface SalesApiResponse {
  data: SalesRecord[];
  summary: {
    totalSales: number;
    averageMonthlySales: number;
    topCategory: string;
    recordCount: number;
  };
  year: SalesYear;
  threshold: number;
}
