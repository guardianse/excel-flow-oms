
import { useState } from "react";
import { FileSpreadsheet, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";

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
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (validateFile(droppedFile)) {
      setFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
      }
    }
  };

  const validateFile = (file: File) => {
    const validExtensions = [".xlsx", ".xls"];
    const fileExt = "." + file.name.split(".").pop()?.toLowerCase();
    
    if (!validExtensions.includes(fileExt)) {
      toast({
        variant: "destructive",
        title: "Invalid file format",
        description: "Please upload an Excel file (.xlsx or .xls)",
      });
      return false;
    }
    
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Please upload a file smaller than 10MB",
      });
      return false;
    }
    
    return true;
  };

  const removeFile = () => {
    setFile(null);
    setUploadProgress(0);
  };

  const handleUpload = () => {
    if (!file) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
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
              // Simulated error
              toast({
                variant: "destructive",
                title: "Processing error",
                description: "There was an error with some items in your file.",
              });
              
              onUploadError("Validation failed for row 3: Missing required SKU");
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
          
          {!file ? (
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center hover:bg-muted/50 transition-colors ${
                isDragging ? "border-primary bg-primary/10" : "border-muted-foreground/25"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload className="w-10 h-10 mx-auto text-muted-foreground" />
              <h4 className="text-base font-medium mt-4">Drag and drop your Excel file</h4>
              <p className="text-sm text-muted-foreground mt-1">or click to browse</p>
              <input
                type="file"
                id={`file-upload-${fileType}`}
                className="hidden"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
              />
              <Button
                variant="secondary"
                className="mt-4"
                onClick={() => document.getElementById(`file-upload-${fileType}`)?.click()}
              >
                Select File
              </Button>
            </div>
          ) : (
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
                  <Button variant="ghost" size="icon" onClick={removeFile}>
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
                <Button onClick={handleUpload} className="w-full">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload and Process
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
