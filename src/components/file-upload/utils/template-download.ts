
import { outboundTemplateFields } from './template-structure';
import * as XLSX from 'xlsx';

export function generateOutboundTemplate() {
  const ws = XLSX.utils.aoa_to_sheet([outboundTemplateFields]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Outbound Template');
  
  // Auto-size columns
  const colWidths = outboundTemplateFields.map(field => 
    Math.max(15, field.length + 2)
  );
  ws['!cols'] = colWidths.map(width => ({ width }));
  
  XLSX.writeFile(wb, 'outbound-template.xlsx');
}
