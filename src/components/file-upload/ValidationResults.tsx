
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle, XCircle } from "lucide-react";
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
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setExpanded(!expanded)}
                className="text-xs h-7"
              >
                {expanded ? "Show less" : "Show more"}
              </Button>
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
                    <tr key={index} className="border-t">
                      <td className="p-2">{item.sku}</td>
                      <td className="p-2">{item.name}</td>
                      <td className="p-2">{item.quantity}</td>
                      <td className="p-2">{type === "inbound" ? item.source : item.destination || item.source}</td>
                      <td className="p-2">
                        <Badge variant="outline" className={cn(
                          "bg-primary/10 text-primary hover:bg-primary/20 border-primary/20"
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
            <Button onClick={onConfirm}>
              Confirm & Save
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
