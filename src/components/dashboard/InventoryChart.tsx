
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

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
    <Card className="animate-enter">
      <CardHeader>
        <CardTitle>Weekly Inventory Flow</CardTitle>
        <CardDescription>Inbound vs Outbound movement over the past week</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="inbound" name="Inbound" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            <Bar dataKey="outbound" name="Outbound" fill="hsl(var(--accent-foreground) / 0.8)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
