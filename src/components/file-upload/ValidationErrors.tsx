
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ValidationErrorsProps {
  errors: string[];
}

export function ValidationErrors({ errors }: ValidationErrorsProps) {
  if (!errors.length) {
    return null;
  }
  
  return (
    <Alert variant="destructive" className="animate-enter">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription>
        <div className="mt-1">
          {errors.map((error, index) => (
            <p key={index} className="text-sm">{error}</p>
          ))}
        </div>
      </AlertDescription>
    </Alert>
  );
}
