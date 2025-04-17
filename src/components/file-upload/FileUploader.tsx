
import { useState } from "react";
import { FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { validateFile } from "./utils/file-validation";
import { DropZone } from "./DropZone";
import { FilePreview } from "./FilePreview";
import { ValidationErrors } from "./ValidationErrors";

interface FileUploaderProps {
  title: string;
  description: string;
  onUploadSuccess: (data: any[]) => void;
  onUploadError: (error: string) => void;
  fileType: "inbound" | "outbound";
  templateUrl: string;
}

export function FileUploader({
  title,
  description,
  onUploadSuccess,
  onUploadError,
  fileType,
  templateUrl,
}: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const { toast } = useToast();

  const handleFileDrop = (selectedFile: File) => {
    setValidationErrors([]);
    const validation = validateFile(selectedFile);
    
    if (validation.isValid) {
      setFile(selectedFile);
    } else {
      setValidationErrors(validation.errors);
      toast({
        variant: "destructive",
        title: "Validation failed",
        description: validation.errors[0],
      });
    }
  };

  const removeFile = () => {
    setFile(null);
    setUploadProgress(0);
    setValidationErrors([]);
  };

  const handleUpload = () => {
    if (!file) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    setValidationErrors([]);
    
    // Simulate file processing with progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          
          // Mock data processing
          setTimeout(() => {
            setIsUploading(false);
            
            // Generate mock data based on file type
            if (Math.random() > 0.2) { // 80% success chance
              const mockData = Array(10).fill(0).map((_, i) => ({
                id: `ITEM-${i + 100}`,
                sku: `SKU-${1000 + i}`,
                name: `Product ${i + 1}`,
                quantity: Math.floor(Math.random() * 100) + 10,
                date: new Date().toISOString().split('T')[0],
                source: fileType === "inbound" ? "Vendor A" : "Store 5",
                status: "Processed",
              }));
              
              toast({
                title: "Upload successful",
                description: `${file.name} has been processed.`,
              });
              
              onUploadSuccess(mockData);
              setFile(null);
            } else {
              // Simulated error with more specific details
              const mockError = fileType === "inbound" 
                ? "Validation failed for row 3: Missing required SKU and quantity fields" 
                : "Validation failed for row 5: Quantity exceeds available stock";
              
              setValidationErrors([mockError]);
              
              toast({
                variant: "destructive",
                title: "Processing error",
                description: "There was an error with some items in your file.",
              });
              
              onUploadError(mockError);
            }
          }, 500);
        }
        
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 200);
  };

  const downloadTemplate = () => {
    toast({
      title: "Template downloaded",
      description: `The ${fileType} template has been downloaded.`,
    });
    // In a real app, this would trigger a file download
    window.open(templateUrl, '_blank');
  };

  return (
    <Card className="bg-muted/30">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4 items-start">
            <div>
              <h3 className="text-lg font-medium">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <Button variant="outline" onClick={downloadTemplate} size="sm" className="whitespace-nowrap">
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Download Template
            </Button>
          </div>
          
          <ValidationErrors errors={validationErrors} />
          
          {!file ? (
            <DropZone onFileDrop={handleFileDrop} fileType={fileType} />
          ) : (
            <FilePreview 
              file={file}
              onRemove={removeFile}
              onUpload={handleUpload}
              isUploading={isUploading}
              uploadProgress={uploadProgress}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
