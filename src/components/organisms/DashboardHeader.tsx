import Link from "next/link";

export function DashboardHeader() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Sales Dashboard</h1>
          <p className="text-sm text-gray-500">
            Retail sales analytics — 2022, 2023 & 2024
          </p>
        </div>
        <nav className="flex gap-4 text-sm">
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className="font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}
