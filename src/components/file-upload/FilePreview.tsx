
import { FileSpreadsheet, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface FilePreviewProps {
  file: File;
  onRemove: () => void;
  onUpload: () => void;
  isUploading: boolean;
  uploadProgress: number;
}

export function FilePreview({
  file,
  onRemove,
  onUpload,
  isUploading,
  uploadProgress
}: FilePreviewProps) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <FileSpreadsheet className="w-8 h-8 mr-3 text-primary" />
          <div>
            <p className="font-medium">{file.name}</p>
            <p className="text-xs text-muted-foreground">
              {(file.size / 1024).toFixed(1)} KB • Excel File
            </p>
          </div>
        </div>
        {!isUploading && (
          <Button variant="ghost" size="icon" onClick={onRemove}>
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
      
      {isUploading ? (
        <div className="space-y-2">
          <Progress value={uploadProgress} className="h-2" />
          <p className="text-xs text-right text-muted-foreground">
            {uploadProgress}% - Processing file...
          </p>
        </div>
      ) : (
        <Button onClick={onUpload} className="w-full">
          <Upload className="w-4 h-4 mr-2" />
          Upload and Process
        </Button>
      )}
    </div>
  );
}
