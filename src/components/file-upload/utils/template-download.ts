
import { outboundTemplateFields } from './template-structure';
import * as XLSX from 'xlsx';

export function generateOutboundTemplate() {
  // Create a mutable copy of the readonly array by spreading it
  const fields = [...outboundTemplateFields];
  const ws = XLSX.utils.aoa_to_sheet([fields]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Outbound Template');
  
  // Auto-size columns
  const colWidths = fields.map(field => 
    Math.max(15, field.length + 2)
  );
  ws['!cols'] = colWidths.map(width => ({ width }));
  
  XLSX.writeFile(wb, 'outbound-template.xlsx');
}
