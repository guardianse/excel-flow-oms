
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Download, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Bar, 
  BarChart, 
  CartesianGrid, 
  Legend, 
  Line, 
  LineChart, 
  PolarAngleAxis, 
  PolarGrid, 
  PolarRadiusAxis, 
  Radar, 
  RadarChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";
import { useToast } from "@/components/ui/use-toast";

const inventoryData = [
  { date: "Jan", inbound: 420, outbound: 362, stock: 58 },
  { date: "Feb", inbound: 380, outbound: 356, stock: 82 },
  { date: "Mar", inbound: 500, outbound: 470, stock: 112 },
  { date: "Apr", inbound: 460, outbound: 430, stock: 142 },
  { date: "May", inbound: 450, outbound: 510, stock: 82 },
  { date: "Jun", inbound: 520, outbound: 490, stock: 112 },
];

const skuPerformanceData = [
  { name: "SKU-1001", inbound: 150, outbound: 140, stock: 130 },
  { name: "SKU-1002", inbound: 120, outbound: 110, stock: 60 },
  { name: "SKU-2201", inbound: 90, outbound: 85, stock: 50 },
  { name: "SKU-3301", inbound: 70, outbound: 65, stock: 40 },
  { name: "SKU-4401", inbound: 50, outbound: 46, stock: 30 },
];

const topSourcesData = [
  { name: "Vendor A", value: 42 },
  { name: "Vendor B", value: 28 },
  { name: "Vendor C", value: 16 },
  { name: "Returns", value: 9 },
  { name: "Transfers", value: 5 },
];

const topDestinationsData = [
  { name: "Store #5", value: 35 },
  { name: "Store #3", value: 25 },
  { name: "Online Orders", value: 20 },
  { name: "Store #7", value: 15 },
  { name: "Wholesale", value: 5 },
];

export default function Reports() {
  const [reportType, setReportType] = useState("inventory");
  const [startDate, setStartDate] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() - 30))
  );
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const { toast } = useToast();

  const handleExport = (format: "pdf" | "excel") => {
    toast({
      title: `Report exported as ${format.toUpperCase()}`,
      description: "The report has been generated and downloaded.",
    });
  };

  const handleRefresh = () => {
    toast({
      title: "Report refreshed",
      description: "The report data has been updated.",
    });
  };

  const renderInventoryReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Inventory Flow Over Time</CardTitle>
            <CardDescription>Comparing inbound and outbound movements</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={inventoryData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="inbound" stroke="hsl(var(--primary))" name="Inbound" />
                <Line type="monotone" dataKey="outbound" stroke="hsl(var(--destructive))" name="Outbound" />
                <Line type="monotone" dataKey="stock" stroke="hsl(var(--accent-foreground))" name="Net Stock" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>SKU Performance</CardTitle>
            <CardDescription>Top SKUs by transaction volume</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skuPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="inbound" name="Inbound" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="outbound" name="Outbound" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Sources (Inbound)</CardTitle>
            <CardDescription>Distribution by vendor/origin</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={topSourcesData} cx="50%" cy="50%" outerRadius="70%">
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis />
                <Radar name="Value" dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.6)" fillOpacity={0.6} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top Destinations (Outbound)</CardTitle>
            <CardDescription>Distribution by location/customer</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={topDestinationsData} cx="50%" cy="50%" outerRadius="70%">
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis />
                <Radar name="Value" dataKey="value" stroke="hsl(var(--destructive))" fill="hsl(var(--destructive) / 0.6)" fillOpacity={0.6} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Reports & Analytics</CardTitle>
              <CardDescription>
                Generate custom reports for inventory analysis and business insights
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleRefresh}>
                <RefreshCcw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" onClick={() => handleExport("excel")}>
                <Download className="h-4 w-4 mr-2" />
                Export Excel
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center">
            <div className="space-y-2">
              <p className="text-sm font-medium">Report Type</p>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="w-[220px]">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inventory">Inventory Movement</SelectItem>
                  <SelectItem value="sku">SKU Performance</SelectItem>
                  <SelectItem value="vendor">Vendor Analysis</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">Time Period</p>
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[130px] justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "MMM dd, yyyy") : "Start date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                      fromDate={new Date(2023, 0, 1)}
                      toDate={endDate || new Date()}
                    />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[130px] justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "MMM dd, yyyy") : "End date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                      fromDate={startDate || new Date(2023, 0, 1)}
                      toDate={new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <Tabs defaultValue="charts" className="mt-6">
            <TabsList>
              <TabsTrigger value="charts">Charts</TabsTrigger>
              <TabsTrigger value="tables">Data Tables</TabsTrigger>
              <TabsTrigger value="summary">Summary</TabsTrigger>
            </TabsList>
            <TabsContent value="charts">{renderInventoryReport()}</TabsContent>
            <TabsContent value="tables">
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Data</CardTitle>
                  <CardDescription>Tabular view of the report data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="p-3 text-left font-medium">Date</th>
                          <th className="p-3 text-left font-medium">Inbound</th>
                          <th className="p-3 text-left font-medium">Outbound</th>
                          <th className="p-3 text-left font-medium">Net</th>
                          <th className="p-3 text-left font-medium">Running Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inventoryData.map((item, i) => (
                          <tr key={i} className="border-t">
                            <td className="p-3">{item.date}</td>
                            <td className="p-3">{item.inbound}</td>
                            <td className="p-3">{item.outbound}</td>
                            <td className="p-3">{item.inbound - item.outbound}</td>
                            <td className="p-3">{item.stock}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="bg-muted/50">
                          <th className="p-3 text-left font-medium">Total</th>
                          <td className="p-3 font-medium">
                            {inventoryData.reduce((sum, item) => sum + item.inbound, 0)}
                          </td>
                          <td className="p-3 font-medium">
                            {inventoryData.reduce((sum, item) => sum + item.outbound, 0)}
                          </td>
                          <td className="p-3 font-medium">
                            {inventoryData.reduce((sum, item) => sum + (item.inbound - item.outbound), 0)}
                          </td>
                          <td className="p-3 font-medium">
                            {inventoryData[inventoryData.length - 1].stock}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="summary">
              <Card>
                <CardHeader>
                  <CardTitle>Executive Summary</CardTitle>
                  <CardDescription>Key metrics and insights</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="bg-primary/5">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Total Inbound</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-3xl font-bold">
                            {inventoryData.reduce((sum, item) => sum + item.inbound, 0)}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">Last 6 months</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-destructive/5">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Total Outbound</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-3xl font-bold">
                            {inventoryData.reduce((sum, item) => sum + item.outbound, 0)}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">Last 6 months</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-accent/5">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Current Stock</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-3xl font-bold">
                            {inventoryData[inventoryData.length - 1].stock}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">As of today</p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Key Findings</h3>
                      <ul className="space-y-3 list-disc pl-5">
                        <li>Inbound volume increased by 12% compared to previous period</li>
                        <li>Vendor A remains the top supplier at 42% of total inbound volume</li>
                        <li>Store #5 is the top destination for outbound shipments</li>
                        <li>SKU-1001 has the highest turnover rate across all inventory</li>
                        <li>Current stock levels are 15% higher than optimal threshold</li>
                      </ul>
                      <h3 className="text-lg font-semibold mt-6">Recommendations</h3>
                      <ul className="space-y-3 list-disc pl-5">
                        <li>Consider reducing order volume for SKU-1002 due to slower movement</li>
                        <li>Optimize outbound to Store #3 to match previous patterns</li>
                        <li>Investigate increasing supplier diversity to reduce dependency on Vendor A</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
