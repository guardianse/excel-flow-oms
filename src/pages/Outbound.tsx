
import { useState } from "react";
import { FileUploader } from "@/components/file-upload/FileUploader";
import { ValidationResults } from "@/components/file-upload/ValidationResults";
import { TransactionTable } from "@/components/tables/TransactionTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

// Sample outbound transactions for demo
const sampleOutboundData = [
  {
    id: "OUT-1001",
    date: "2025-04-15",
    sku: "SKU-1001",
    name: "Premium T-Shirt (White, L)",
    quantity: 10,
    source: "Warehouse A",
    destination: "Store #5",
    status: "Completed",
    reference: "SO-2025-101"
  },
  {
    id: "OUT-1002",
    date: "2025-04-15",
    sku: "SKU-1002",
    name: "Premium T-Shirt (Black, M)",
    quantity: 8,
    source: "Warehouse A",
    destination: "Store #3",
    status: "Completed",
    reference: "SO-2025-102"
  },
  {
    id: "OUT-1003",
    date: "2025-04-14",
    sku: "SKU-2201",
    name: "Classic Jeans (Blue, 32)",
    quantity: 5,
    source: "Warehouse A",
    destination: "Online Order",
    status: "Completed",
    reference: "ORD-2025-1245"
  },
  {
    id: "OUT-1004",
    date: "2025-04-13",
    sku: "SKU-3301",
    name: "Running Shoes (Black, 42)",
    quantity: 3,
    source: "Warehouse B",
    destination: "Store #7",
    status: "Completed",
    reference: "SO-2025-103"
  },
  {
    id: "OUT-1005",
    date: "2025-04-12",
    sku: "SKU-4401",
    name: "Wireless Earbuds",
    quantity: 2,
    source: "Warehouse A",
    destination: "Online Order",
    status: "Completed",
    reference: "ORD-2025-1246"
  }
];

export default function Outbound() {
  const [validationResults, setValidationResults] = useState<{
    success: boolean;
    data?: any[];
    error?: string;
  } | null>(null);
  
  const [outboundData, setOutboundData] = useState(sampleOutboundData);
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
        id: `OUT-${2000 + index}`,
        date: new Date().toISOString().split('T')[0],
        sku: item.sku,
        name: item.name,
        quantity: item.quantity,
        source: "Warehouse A",
        destination: item.source,
        status: "Completed",
        reference: `SO-${Math.floor(Math.random() * 10000)}`
      }));
      
      setOutboundData([...newItems, ...outboundData]);
      toast({
        title: "Outbound data saved",
        description: `${newItems.length} new outbound shipments have been added.`,
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
          <CardTitle>Outbound Management</CardTitle>
          <CardDescription>
            Upload and manage outbound shipments to stores, customers, and partners
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
                title="Upload Outbound Excel File"
                description="Upload store orders, customer shipments, or stock transfers"
                onUploadSuccess={handleUploadSuccess}
                onUploadError={handleUploadError}
                fileType="outbound"
                templateUrl="/templates/outbound-template.xlsx"
              />
              
              {validationResults && (
                <ValidationResults
                  results={validationResults}
                  onConfirm={handleConfirm}
                  onCancel={handleCancel}
                  type="outbound"
                />
              )}
            </TabsContent>
            <TabsContent value="history">
              <TransactionTable 
                title="Outbound History" 
                data={outboundData}
                type="outbound"
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
