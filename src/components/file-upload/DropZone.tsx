
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface DropZoneProps {
  onFileDrop: (file: File) => void;
  fileType: string;
}

export function DropZone({ onFileDrop, fileType }: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);

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
    if (droppedFile) {
      onFileDrop(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileDrop(e.target.files[0]);
    }
  };

  return (
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
  );
}
