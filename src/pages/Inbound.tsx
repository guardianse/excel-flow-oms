
import { useState } from "react";
import { FileUploader } from "@/components/file-upload/FileUploader";
import { ValidationResults } from "@/components/file-upload/ValidationResults";
import { TransactionTable } from "@/components/tables/TransactionTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

// Sample inbound transactions for demo
const sampleInboundData = [
  {
    id: "INB-1001",
    date: "2025-04-15",
    sku: "SKU-1001",
    name: "Premium T-Shirt (White, L)",
    quantity: 50,
    source: "Vendor A",
    status: "Completed",
    reference: "PO-2025-001"
  },
  {
    id: "INB-1002",
    date: "2025-04-15",
    sku: "SKU-1002",
    name: "Premium T-Shirt (Black, M)",
    quantity: 40,
    source: "Vendor A",
    status: "Completed",
    reference: "PO-2025-001"
  },
  {
    id: "INB-1003",
    date: "2025-04-14",
    sku: "SKU-2201",
    name: "Classic Jeans (Blue, 32)",
    quantity: 30,
    source: "Vendor B",
    status: "Completed",
    reference: "PO-2025-002"
  },
  {
    id: "INB-1004",
    date: "2025-04-13",
    sku: "SKU-3301",
    name: "Running Shoes (Black, 42)",
    quantity: 20,
    source: "Vendor C",
    status: "Completed",
    reference: "PO-2025-003"
  },
  {
    id: "INB-1005",
    date: "2025-04-12",
    sku: "SKU-4401",
    name: "Wireless Earbuds",
    quantity: 10,
    source: "Vendor D",
    status: "Completed",
    reference: "PO-2025-004"
  }
];

export default function Inbound() {
  const [validationResults, setValidationResults] = useState<{
    success: boolean;
    data?: any[];
    error?: string;
  } | null>(null);
  
  const [inboundData, setInboundData] = useState(sampleInboundData);
  const { toast } = useToast();
  
  const handleUploadSuccess = (data: any[]) => {
    setValidationResults({
      success: true,
      data
    });
  };
  
  const handleUploadError = (error: string) => {
    setValidationResults({
      success: false,
      error
    });
  };
  
  const handleConfirm = () => {
    if (validationResults?.data) {
      // In a real app, this would save to a database
      const newItems = validationResults.data.map((item, index) => ({
        id: `INB-${2000 + index}`,
        date: new Date().toISOString().split('T')[0],
        sku: item.sku,
        name: item.name,
        quantity: item.quantity,
        source: item.source,
        status: "Completed",
        reference: `PO-${Math.floor(Math.random() * 10000)}`
      }));
      
      setInboundData([...newItems, ...inboundData]);
      toast({
        title: "Inbound data saved",
        description: `${newItems.length} new items have been added to the inventory.`,
      });
      setValidationResults(null);
    }
  };
  
  const handleCancel = () => {
    setValidationResults(null);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Inbound Management</CardTitle>
          <CardDescription>
            Upload and manage inbound inventory from suppliers and returns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upload">
            <TabsList className="mb-4">
              <TabsTrigger value="upload">Upload</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            <TabsContent value="upload" className="space-y-4">
              <FileUploader
                title="Upload Inbound Excel File"
                description="Upload supplier deliveries, returns, or stock transfers"
                onUploadSuccess={handleUploadSuccess}
                onUploadError={handleUploadError}
                fileType="inbound"
                templateUrl="/templates/inbound-template.xlsx"
              />
              
              {validationResults && (
                <ValidationResults
                  results={validationResults}
                  onConfirm={handleConfirm}
                  onCancel={handleCancel}
                  type="inbound"
                />
              )}
            </TabsContent>
            <TabsContent value="history">
              <TransactionTable 
                title="Inbound History" 
                data={inboundData}
                type="inbound"
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
