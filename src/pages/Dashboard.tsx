
import { InventorySummary } from "@/components/dashboard/InventorySummary";
import { InventoryChart } from "@/components/dashboard/InventoryChart";
import { RecentUploads } from "@/components/dashboard/RecentUploads";
import { TopItems } from "@/components/dashboard/TopItems";

export default function Dashboard() {
  return (
    <div className="space-y-6">
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
