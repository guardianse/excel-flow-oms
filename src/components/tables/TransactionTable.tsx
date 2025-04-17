
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  DownloadCloud, 
  Search,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export interface Transaction {
  id: string;
  date: string;
  sku: string;
  name: string;
  quantity: number;
  source: string;
  destination?: string;
  status: string;
  reference?: string;
}

interface TransactionTableProps {
  title: string;
  data: Transaction[];
  type: "inbound" | "outbound";
}

export function TransactionTable({ title, data, type }: TransactionTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const filteredData = data.filter(
    item => 
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.source.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  return (
    <div className="space-y-4 animate-enter">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by SKU, name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-[200px] md:w-[300px]"
            />
          </div>
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
          <Button variant="outline">
            <DownloadCloud className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      <div className="border rounded-md overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead>{type === "inbound" ? "Source" : "Destination"}</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.date}</TableCell>
                    <TableCell className="font-mono">{item.sku}</TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {item.name}
                    </TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell>{type === "inbound" ? item.source : item.destination || item.source}</TableCell>
                    <TableCell>{item.reference || "-"}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn(
                        item.status === "Completed" ? "bg-green-500/15 text-green-600 hover:bg-green-500/20" :
                        item.status === "Pending" ? "bg-amber-500/15 text-amber-600 hover:bg-amber-500/20" :
                        item.status === "Processing" ? "bg-blue-500/15 text-blue-600 hover:bg-blue-500/20" :
                        "bg-gray-500/15 text-gray-600 hover:bg-gray-500/20"
                      )}>
                        {item.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      
      {filteredData.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {((currentPage - 1) * itemsPerPage) + 1}-
            {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} items
          </p>
          
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center">
              {[...Array(Math.min(3, pageCount))].map((_, i) => {
                let pageNum = i + 1;
                if (pageCount > 3 && currentPage > 2) {
                  pageNum = currentPage - 1 + i;
                }
                if (pageNum > pageCount) return null;
                
                return (
                  <Button
                    key={i}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    className="w-8 h-8 p-0 mx-0.5"
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              })}
              {pageCount > 3 && currentPage < pageCount - 1 && (
                <span className="mx-1">...</span>
              )}
              {pageCount > 3 && currentPage < pageCount && (
                <Button
                  variant={currentPage === pageCount ? "default" : "outline"}
                  size="sm"
                  className="w-8 h-8 p-0 mx-0.5"
                  onClick={() => setCurrentPage(pageCount)}
                >
                  {pageCount}
                </Button>
              )}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(Math.min(pageCount, currentPage + 1))}
              disabled={currentPage === pageCount}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
