
export function exportDataToCsv(data: any[], filename: string): void {
  if (!data || data.length === 0) {
    return;
  }
  
  const headers = Object.keys(data[0]).join(',');
  const rows = data.map(item => Object.values(item).join(','));
  const csvContent = [headers, ...rows].join('\n');
  
  // Create a downloadable blob
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
