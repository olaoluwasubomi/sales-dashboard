# Sales Dashboard

An interactive retail sales analytics dashboard built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. The project follows **Atomic Design** principles and visualizes mock Kaggle-style sales data for 2022, 2023, and 2024.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)
![Recharts](https://img.shields.io/badge/Recharts-2-22c55e)

## Features

- **Sales data by year** — View retail sales for 2022, 2023, and 2024
- **Multiple chart types** — Switch between bar, line, and pie charts (Recharts)
- **Custom sales threshold filter** — Filter records above a user-defined dollar amount
- **API integration** — Data fetched from `/api/sales` instead of hardcoded in components
- **Atomic Design architecture** — Organized atoms → molecules → organisms → templates → pages
- **Responsive dashboard** — Clean layout with summary stat cards

## Project Structure (Atomic Design)

```
src/
├── app/
│   ├── api/sales/route.ts    # REST API for sales data
│   ├── dashboard/page.tsx    # Dashboard page
│   ├── page.tsx              # Landing page
│   └── layout.tsx
├── components/
│   ├── atoms/                # Button, Input, Select, Card, Label
│   ├── molecules/            # ChartTypeSwitcher, YearSelector, ThresholdFilter, StatCard
│   ├── organisms/            # SalesChart, SalesDashboard, DashboardHeader, charts/
│   └── templates/            # DashboardLayout
├── hooks/
│   └── useSalesData.ts       # Client hook for API fetching
├── lib/
│   └── mock-sales-data.ts    # Kaggle-inspired mock retail data
└── types/
    └── sales.ts              # TypeScript interfaces
```

## Mock Data

Sales data is modeled after common Kaggle retail/supermarket datasets:

- **Categories:** Electronics, Clothing, Groceries, Home & Garden, Sports
- **Regions:** North, South, East, West, Central
- **Seasonal patterns:** Higher sales in Nov–Dec (holiday season)
- **Year-over-year growth:** 2023 (+12%), 2024 (+24%) vs 2022 baseline

## API Endpoints

### `GET /api/sales`

| Parameter   | Type   | Default | Description                          |
|-------------|--------|---------|--------------------------------------|
| `year`      | number | —       | Required. 2022, 2023, or 2024        |
| `threshold` | number | 0       | Minimum sales amount to include      |

**Example:**
```
GET /api/sales?year=2024&threshold=15000
```

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd sales-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and click **Open Dashboard**, or go directly to [http://localhost:3000/dashboard](http://localhost:3000/dashboard).

### Build for Production

```bash
npm run build
npm start
```

## Tech Stack

| Technology   | Purpose                        |
|--------------|--------------------------------|
| Next.js 15   | App Router, API routes         |
| TypeScript   | Type-safe development          |
| Tailwind CSS | Utility-first styling          |
| Recharts     | Bar, line, and pie charts      |
| React 19     | UI components                  |

## What Was Built

1. **Atomic component library** — Reusable UI primitives and composed widgets
2. **Three chart components** — BarChart, LineChart, PieChart using Recharts
3. **Sales API route** — Server-side data serving with year and threshold filters
4. **Dashboard page** — Year selector, threshold input, stat cards, and chart switcher
5. **Custom hook** — `useSalesData` fetches from the API with loading/error states
6. **Landing page** — Simple home page linking to the dashboard

## License

MIT
