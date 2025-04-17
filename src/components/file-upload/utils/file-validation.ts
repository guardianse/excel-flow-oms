
export type ValidationError = string;

export const validateFile = (file: File): { isValid: boolean; errors: ValidationError[] } => {
  const errors: ValidationError[] = [];
  
  // Check file extension
  const validExtensions = [".xlsx", ".xls"];
  const fileExt = "." + file.name.split(".").pop()?.toLowerCase();
  
  if (!validExtensions.includes(fileExt)) {
    errors.push("Invalid file format. Please upload an Excel file (.xlsx or .xls)");
  }
  
  // Check file size
  if (file.size > 10 * 1024 * 1024) { // 10MB limit
    errors.push("File size exceeds the 10MB limit");
  }
  
  // Check file name length
  if (file.name.length > 100) {
    errors.push("File name is too long (maximum 100 characters)");
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
