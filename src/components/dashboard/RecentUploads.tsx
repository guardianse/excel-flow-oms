
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileCheck, FilePlus, FileX } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Status = "success" | "failed" | "pending";

interface RecentUpload {
  id: string;
  fileName: string;
  type: "inbound" | "outbound";
  timestamp: string;
  status: Status;
  user: string;
}

const recentUploads: RecentUpload[] = [
  {
    id: "upload-1",
    fileName: "inbound-vendor-a-20250415.xlsx",
    type: "inbound",
    timestamp: "15 Apr, 10:23 AM",
    status: "success",
    user: "Sarah Johnson",
  },
  {
    id: "upload-2",
    fileName: "outbound-store-12-20250415.xlsx",
    type: "outbound",
    timestamp: "15 Apr, 09:45 AM",
    status: "success",
    user: "Michael Chen",
  },
  {
    id: "upload-3",
    fileName: "inbound-returns-20250414.xlsx",
    type: "inbound",
    timestamp: "14 Apr, 04:12 PM",
    status: "failed",
    user: "Alex Wong",
  },
  {
    id: "upload-4",
    fileName: "outbound-wholesale-20250414.xlsx",
    type: "outbound", 
    timestamp: "14 Apr, 02:56 PM",
    status: "pending",
    user: "Jessica Miller",
  },
  {
    id: "upload-5",
    fileName: "inbound-vendor-b-20250414.xlsx",
    type: "inbound",
    timestamp: "14 Apr, 11:32 AM",
    status: "success", 
    user: "David Thompson",
  }
];

function getStatusIcon(status: Status) {
  switch (status) {
    case "success":
      return <FileCheck className="h-4 w-4 text-green-500" />;
    case "failed":
      return <FileX className="h-4 w-4 text-red-500" />;
    case "pending":
      return <FilePlus className="h-4 w-4 text-amber-500" />;
  }
}

function getStatusBadgeStyle(status: Status) {
  switch (status) {
    case "success":
      return "bg-green-500/15 text-green-600 hover:bg-green-500/20";
    case "failed":
      return "bg-red-500/15 text-red-600 hover:bg-red-500/20";
    case "pending":
      return "bg-amber-500/15 text-amber-600 hover:bg-amber-500/20";
  }
}

export function RecentUploads() {
  return (
    <Card className="animate-enter">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Uploads</CardTitle>
        <Button variant="outline" size="sm">View All</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentUploads.map((upload, index) => (
            <div 
              key={upload.id} 
              className="flex items-center gap-4 animate-enter" 
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-muted/70 p-2 rounded">
                {getStatusIcon(upload.status)}
              </div>
              <div className="flex-1 space-y-1">
                <p className="font-medium text-sm">{upload.fileName}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{upload.timestamp}</span>
                  <span>•</span>
                  <span>{upload.user}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={cn(getStatusBadgeStyle(upload.status))}>
                  {upload.status}
                </Badge>
                <Badge variant="secondary" className={cn(
                  upload.type === "inbound" ? "bg-blue-500/10 text-blue-600" : "bg-purple-500/10 text-purple-600"
                )}>
                  {upload.type}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
