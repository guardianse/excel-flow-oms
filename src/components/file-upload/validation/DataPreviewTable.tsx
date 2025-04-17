
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface DataPreviewTableProps {
  data: any[];
  type: "inbound" | "outbound";
  onExport: () => void;
}

export function DataPreviewTable({ data, type, onExport }: DataPreviewTableProps) {
  const [expanded, setExpanded] = useState(false);
  
  if (!data.length) return null;
  
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium">Data Preview</h4>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs h-7 flex items-center gap-1"
            onClick={onExport}
          >
            <Download className="h-3 w-3" />
            Export
          </Button>
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
            {data.slice(0, expanded ? undefined : 3).map((item, index) => (
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
      {!expanded && data.length > 3 && (
        <p className="text-xs text-muted-foreground mt-2">
          + {data.length - 3} more items not shown
        </p>
      )}
    </div>
  );
}
