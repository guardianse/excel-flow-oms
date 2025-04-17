
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const data = [
  { name: "Mon", inbound: 24, outbound: 18 },
  { name: "Tue", inbound: 13, outbound: 10 },
  { name: "Wed", inbound: 38, outbound: 30 },
  { name: "Thu", inbound: 43, outbound: 40 },
  { name: "Fri", inbound: 55, outbound: 60 },
  { name: "Sat", inbound: 12, outbound: 10 },
  { name: "Sun", inbound: 5, outbound: 4 },
];

export function InventoryChart() {
  return (
    <Card className="animate-enter h-full">
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>Weekly Inventory Flow</CardTitle>
          <CardDescription>Inbound vs Outbound movement over the past week</CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon">
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="text-xs flex gap-1 items-center h-8">
            <CalendarIcon className="h-3.5 w-3.5" />
            <span>Apr 14 - Apr 20, 2025</span>
          </Button>
          <Button variant="outline" size="icon">
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '8px',
                border: '1px solid rgba(0,0,0,0.1)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
              }} 
            />
            <Legend />
            <Bar 
              dataKey="inbound" 
              name="Inbound" 
              fill="hsl(var(--primary))" 
              radius={[4, 4, 0, 0]} 
              animationDuration={1200}
            />
            <Bar 
              dataKey="outbound" 
              name="Outbound" 
              fill="hsl(var(--accent-foreground) / 0.8)" 
              radius={[4, 4, 0, 0]} 
              animationDuration={1200}
              animationDelay={300}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
