
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Package } from "lucide-react";

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
    <Card className="animate-enter h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Top Items by Volume</CardTitle>
        <Package className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {topItems.map((item, index) => (
            <div 
              key={item.id} 
              className="space-y-2 animate-enter" 
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between font-medium">
                <span>{item.name} <span className="font-normal text-muted-foreground text-xs">({item.id})</span></span>
                <span className="font-mono">{item.quantity.toLocaleString()}</span>
              </div>
              <div className="relative pt-1">
                <Progress value={item.percentageOfTotal} className="h-2" />
                <span className="absolute right-0 -top-1 text-xs text-muted-foreground">{item.percentageOfTotal}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
