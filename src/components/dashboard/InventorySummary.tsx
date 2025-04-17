
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
      delay: "0ms",
    },
    {
      title: "Inbound Today",
      value: "124",
      icon: <ArrowDownCircle className="h-5 w-5 text-green-500" />,
      change: "+12%",
      changeDirection: "up",
      delay: "100ms",
    },
    {
      title: "Outbound Today",
      value: "87",
      icon: <ArrowUpCircle className="h-5 w-5 text-amber-500" />,
      change: "-3%",
      changeDirection: "down",
      delay: "200ms",
    },
    {
      title: "Low Stock Items",
      value: "18",
      icon: <Package2 className="h-5 w-5 text-red-500" />,
      change: "+2",
      changeDirection: "up",
      delay: "300ms",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {summaryItems.map((item) => (
        <Card 
          key={item.title} 
          className="animate-enter" 
          style={{ animationDelay: item.delay }}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {item.title}
            </CardTitle>
            <div className="bg-muted/50 p-1.5 rounded-md">
              {item.icon}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
            <p className={`text-xs flex items-center gap-1 mt-1 ${item.changeDirection === 'up' ? 'text-green-500' : 'text-red-500'}`}>
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
