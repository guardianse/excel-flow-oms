
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function Settings() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // General settings
  const [companyName, setCompanyName] = useState("Excel-Flow OMS");
  const [email, setEmail] = useState("notifications@example.com");
  const [timezone, setTimezone] = useState("UTC+0");

  // Notifications settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [inboundAlerts, setInboundAlerts] = useState(true);
  const [outboundAlerts, setOutboundAlerts] = useState(true);
  const [lowStockAlerts, setLowStockAlerts] = useState(true);
  const [dailyReports, setDailyReports] = useState(false);

  // System settings
  const [lowStockThreshold, setLowStockThreshold] = useState("10");
  const [dataRetentionDays, setDataRetentionDays] = useState("365");
  const [maxFileSize, setMaxFileSize] = useState("10");
  const [enableAuditLog, setEnableAuditLog] = useState(true);

  const handleSaveSettings = (tab: string) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Settings saved",
        description: `Your ${tab} settings have been updated successfully.`,
      });
    }, 800);
  };

  const handleTestEmail = () => {
    toast({
      title: "Test email sent",
      description: `A test notification has been sent to ${email}.`,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>System Settings</CardTitle>
          <CardDescription>
            Configure the Order Management System settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general">
            <TabsList className="mb-4">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>
            
            {/* General Settings */}
            <TabsContent value="general">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Notification Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Default Timezone</Label>
                    <Input
                      id="timezone"
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Used for reporting and timestamps
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    onClick={() => handleSaveSettings('general')}
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            {/* Notification Settings */}
            <TabsContent value="notifications">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable or disable all email notifications
                      </p>
                    </div>
                    <Switch
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Inbound Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Notify when new inbound shipments are processed
                      </p>
                    </div>
                    <Switch
                      checked={inboundAlerts}
                      onCheckedChange={setInboundAlerts}
                      disabled={!emailNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Outbound Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Notify when new outbound shipments are processed
                      </p>
                    </div>
                    <Switch
                      checked={outboundAlerts}
                      onCheckedChange={setOutboundAlerts}
                      disabled={!emailNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Low Stock Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Notify when items fall below minimum threshold
                      </p>
                    </div>
                    <Switch
                      checked={lowStockAlerts}
                      onCheckedChange={setLowStockAlerts}
                      disabled={!emailNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Daily Summary Reports</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive daily inventory summary reports
                      </p>
                    </div>
                    <Switch
                      checked={dailyReports}
                      onCheckedChange={setDailyReports}
                      disabled={!emailNotifications}
                    />
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={handleTestEmail}
                    disabled={!emailNotifications || isLoading}
                  >
                    Send Test Notification
                  </Button>
                  <Button 
                    onClick={() => handleSaveSettings('notification')}
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            {/* System Settings */}
            <TabsContent value="system">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="lowStockThreshold">Low Stock Threshold</Label>
                    <Input
                      id="lowStockThreshold"
                      type="number"
                      value={lowStockThreshold}
                      onChange={(e) => setLowStockThreshold(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Minimum quantity before item is flagged as low stock
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dataRetention">Data Retention (days)</Label>
                    <Input
                      id="dataRetention"
                      type="number"
                      value={dataRetentionDays}
                      onChange={(e) => setDataRetentionDays(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      How long to keep historical transaction data
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="maxFileSize">Max Upload File Size (MB)</Label>
                    <Input
                      id="maxFileSize"
                      type="number"
                      value={maxFileSize}
                      onChange={(e) => setMaxFileSize(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable Audit Log</Label>
                      <p className="text-sm text-muted-foreground">
                        Log all user actions for security and compliance
                      </p>
                    </div>
                    <Switch
                      checked={enableAuditLog}
                      onCheckedChange={setEnableAuditLog}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    onClick={() => handleSaveSettings('system')}
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            {/* Templates Settings */}
            <TabsContent value="templates">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-muted/30">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Inbound Template</CardTitle>
                      <CardDescription>
                        Standard format for vendor and returns data
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-muted-foreground">
                          <span>SKU</span>
                          <span>Required</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                          <span>Product Name</span>
                          <span>Required</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                          <span>Quantity</span>
                          <span>Required</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                          <span>Source/Vendor</span>
                          <span>Required</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                          <span>Date</span>
                          <span>Required</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                          <span>PO Number</span>
                          <span>Optional</span>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">
                        Download Template
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-muted/30">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Outbound Template</CardTitle>
                      <CardDescription>
                        Standard format for shipment and transfer data
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-muted-foreground">
                          <span>SKU</span>
                          <span>Required</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                          <span>Product Name</span>
                          <span>Required</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                          <span>Quantity</span>
                          <span>Required</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                          <span>Destination</span>
                          <span>Required</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                          <span>Date</span>
                          <span>Required</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                          <span>SO Number</span>
                          <span>Optional</span>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">
                        Download Template
                      </Button>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    onClick={() => handleSaveSettings('templates')}
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
