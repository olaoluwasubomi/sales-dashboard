import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="max-w-lg text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Sales Analytics
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Explore retail sales data for 2022, 2023, and 2024. Filter by
          threshold, switch chart types, and visualize trends with interactive
          Recharts dashboards.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
          >
            Open Dashboard
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-3 gap-4 text-center">
          {["2022", "2023", "2024"].map((year) => (
            <div
              key={year}
              className="rounded-xl bg-white/80 p-4 shadow-sm backdrop-blur"
            >
              <p className="text-2xl font-bold text-blue-600">{year}</p>
              <p className="text-xs text-gray-500 mt-1">Sales Data</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
