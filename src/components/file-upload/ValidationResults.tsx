
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ValidationError } from "./validation/ValidationError";
import { DataPreviewTable } from "./validation/DataPreviewTable";
import { exportDataToCsv } from "./utils/export-utils";

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
  if (!results.data && !results.error) {
    return null;
  }

  const handleExportData = () => {
    if (results.data && results.data.length > 0) {
      const filename = `${type}_data_export_${new Date().toISOString().split('T')[0]}.csv`;
      exportDataToCsv(results.data, filename);
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
          <DataPreviewTable 
            data={results.data} 
            type={type} 
            onExport={handleExportData} 
          />
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
