
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle, XCircle, Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface ValidationErrorProps {
  message: string;
}

function ValidationError({ message }: ValidationErrorProps) {
  return (
    <div className="flex items-start gap-2 text-destructive bg-destructive/5 p-3 rounded-md">
      <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
      <div>
        <p className="font-medium">Validation Error</p>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
}

interface ValidationResultsProps {
  results: {
    success: boolean;
    data?: any[];
    error?: string;
  };
  onConfirm: () => void;
  onCancel: () => void;
  type: "inbound" | "outbound";
}

export function ValidationResults({
  results,
  onConfirm,
  onCancel,
  type
}: ValidationResultsProps) {
  const [expanded, setExpanded] = useState(false);
  
  if (!results.data && !results.error) {
    return null;
  }

  const handleExportData = () => {
    // In a real application, this would generate and download a CSV/Excel file
    // For now, we'll just show a console message
    console.log("Exporting data:", results.data);
    
    // Create a CSV string (simplified example)
    if (results.data && results.data.length > 0) {
      const headers = Object.keys(results.data[0]).join(',');
      const rows = results.data.map(item => Object.values(item).join(','));
      const csvContent = [headers, ...rows].join('\n');
      
      // Create a downloadable blob
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${type}_data_export_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };
  
  return (
    <Card className="mt-6 border-l-4 animate-enter" 
      style={{ 
        borderLeftColor: results.success ? 'hsl(var(--primary))' : 'hsl(var(--destructive))' 
      }}
    >
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          {results.success ? (
            <>
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>File validated successfully</span>
            </>
          ) : (
            <>
              <XCircle className="h-5 w-5 text-destructive" />
              <span>Validation failed</span>
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {results.error && <ValidationError message={results.error} />}
        
        {results.data && results.data.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">Data Preview</h4>
              <div className="flex items-center gap-2">
                {results.success && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs h-7 flex items-center gap-1"
                    onClick={handleExportData}
                  >
                    <Download className="h-3 w-3" />
                    Export
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setExpanded(!expanded)}
                  className="text-xs h-7"
                >
                  {expanded ? "Show less" : "Show more"}
                </Button>
              </div>
            </div>
            <div className="border rounded-md overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="p-2 text-left font-medium">SKU</th>
                    <th className="p-2 text-left font-medium">Name</th>
                    <th className="p-2 text-left font-medium">Quantity</th>
                    <th className="p-2 text-left font-medium">
                      {type === "inbound" ? "Source" : "Destination"}
                    </th>
                    <th className="p-2 text-left font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {results.data.slice(0, expanded ? undefined : 3).map((item, index) => (
                    <tr key={index} className={cn(
                      "border-t",
                      index % 2 === 0 ? "bg-white" : "bg-muted/20"
                    )}>
                      <td className="p-2">{item.sku}</td>
                      <td className="p-2">{item.name}</td>
                      <td className="p-2">{item.quantity}</td>
                      <td className="p-2">{type === "inbound" ? item.source : item.destination || item.source}</td>
                      <td className="p-2">
                        <Badge variant="outline" className={cn(
                          item.status === "Processed" 
                            ? "bg-primary/10 text-primary hover:bg-primary/20 border-primary/20"
                            : item.status === "Warning"
                            ? "bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20 border-yellow-500/20"
                            : "bg-gray-500/10 text-gray-600 hover:bg-gray-500/20 border-gray-500/20"
                        )}>
                          {item.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {!expanded && results.data.length > 3 && (
              <p className="text-xs text-muted-foreground mt-2">
                + {results.data.length - 3} more items not shown
              </p>
            )}
          </div>
        )}
        
        <div className="flex justify-end gap-3 mt-4">
          <Button variant="outline" onClick={onCancel}>
            {results.success ? "Cancel" : "Try Again"}
          </Button>
          {results.success && (
            <Button onClick={onConfirm} className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4" />
              Confirm & Save
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
