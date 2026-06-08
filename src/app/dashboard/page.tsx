import { DashboardLayout } from "@/components/templates/DashboardLayout";
import { SalesDashboard } from "@/components/organisms/SalesDashboard";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <SalesDashboard />
    </DashboardLayout>
  );
}
