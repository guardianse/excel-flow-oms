
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ArrowDownCircle, ArrowUpCircle, Package2 } from "lucide-react";

export function InventorySummary() {
  const summaryItems = [
    {
      title: "Total SKUs",
      value: "342",
      icon: <Package className="h-5 w-5 text-blue-500" />,
      change: "+5%",
      changeDirection: "up",
    },
    {
      title: "Inbound Today",
      value: "124",
      icon: <ArrowDownCircle className="h-5 w-5 text-green-500" />,
      change: "+12%",
      changeDirection: "up",
    },
    {
      title: "Outbound Today",
      value: "87",
      icon: <ArrowUpCircle className="h-5 w-5 text-amber-500" />,
      change: "-3%",
      changeDirection: "down",
    },
    {
      title: "Low Stock Items",
      value: "18",
      icon: <Package2 className="h-5 w-5 text-red-500" />,
      change: "+2",
      changeDirection: "up",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {summaryItems.map((item) => (
        <Card key={item.title} className="animate-enter">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {item.title}
            </CardTitle>
            {item.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
            <p className={`text-xs ${item.changeDirection === 'up' ? 'text-green-500' : 'text-red-500'} flex items-center gap-1`}>
              {item.change}
              {item.changeDirection === 'up' ? 
                <span className="inline-block">↑</span> : 
                <span className="inline-block">↓</span>}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
