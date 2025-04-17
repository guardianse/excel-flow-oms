
import { InventorySummary } from "@/components/dashboard/InventorySummary";
import { InventoryChart } from "@/components/dashboard/InventoryChart";
import { RecentUploads } from "@/components/dashboard/RecentUploads";
import { TopItems } from "@/components/dashboard/TopItems";
import { PageHeader } from "@/components/ui/page-header";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard Overview"
        description="Monitor your warehouse activity and inventory status at a glance"
      />
      
      <InventorySummary />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <InventoryChart />
        </div>
        <div>
          <TopItems />
        </div>
      </div>
      
      <RecentUploads />
    </div>
  );
}
