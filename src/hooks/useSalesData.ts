"use client";

import { useEffect, useState } from "react";
import type { SalesApiResponse, SalesRecord, SalesYear } from "@/types/sales";

interface UseSalesDataResult {
  data: SalesRecord[];
  summary: SalesApiResponse["summary"] | null;
  loading: boolean;
  error: string | null;
}

export function useSalesData(
  year: SalesYear,
  threshold: number
): UseSalesDataResult {
  const [data, setData] = useState<SalesRecord[]>([]);
  const [summary, setSummary] = useState<SalesApiResponse["summary"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchSales() {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          year: String(year),
          threshold: String(threshold),
        });

        const response = await fetch(`/api/sales?${params}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch sales data");
        }

        const json: SalesApiResponse = await response.json();
        setData(json.data);
        setSummary(json.summary);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchSales();

    return () => controller.abort();
  }, [year, threshold]);

  return { data, summary, loading, error };
}
