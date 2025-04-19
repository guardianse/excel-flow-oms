import { useState } from "react";
import { FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { validateFile } from "./utils/file-validation";
import { DropZone } from "./DropZone";
import { FilePreview } from "./FilePreview";
import { ValidationErrors } from "./ValidationErrors";
import { generateOutboundTemplate } from "./utils/template-download";
import { generateMockOutboundData } from "./utils/mock-data";

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
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          
          setTimeout(() => {
            setIsUploading(false);
            
            const mockData = generateMockOutboundData(5);
            
            if (Math.random() > 0.2) { // 80% success chance
              toast({
                title: "Upload successful",
                description: `${file.name} has been processed.`,
              });
              
              onUploadSuccess(mockData);
              setFile(null);
            } else {
              const mockError = "Validation failed: Missing required fields in row 3";
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
    generateOutboundTemplate();
    toast({
      title: "Template downloaded",
      description: `The outbound template has been downloaded.`,
    });
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
