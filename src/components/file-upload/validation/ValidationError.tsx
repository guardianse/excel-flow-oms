
import { AlertCircle } from "lucide-react";

interface ValidationErrorProps {
  message: string;
}

export function ValidationError({ message }: ValidationErrorProps) {
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
