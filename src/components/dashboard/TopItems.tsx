
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const topItems = [
  {
    id: "SKU-1001",
    name: "Premium T-Shirt",
    quantity: 1250,
    percentageOfTotal: 85,
  },
  {
    id: "SKU-3022",
    name: "Classic Jeans",
    quantity: 980,
    percentageOfTotal: 67,
  },
  {
    id: "SKU-5519",
    name: "Running Shoes",
    quantity: 720,
    percentageOfTotal: 49,
  },
  {
    id: "SKU-2244",
    name: "Wireless Earbuds",
    quantity: 650,
    percentageOfTotal: 44,
  },
  {
    id: "SKU-7788",
    name: "Smart Watch",
    quantity: 520, 
    percentageOfTotal: 35,
  }
];

export function TopItems() {
  return (
    <Card className="animate-enter">
      <CardHeader>
        <CardTitle>Top Items by Volume</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topItems.map((item) => (
            <div key={item.id} className="space-y-2">
              <div className="flex items-center justify-between font-medium">
                <span>{item.name} <span className="font-normal text-muted-foreground">({item.id})</span></span>
                <span>{item.quantity} units</span>
              </div>
              <Progress value={item.percentageOfTotal} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
