export interface ExcelHeader {
  key: string;
  value: string;
  width?: number;
  bold?: boolean;
  color?: string;
  backgroundColor?: string;
  // format?: (value: any) => string;
}

export interface CreateExcelOptions {
  filePath: string;
  worksheet: ExcelWorkSheet[];
}
export interface ExcelWorkSheet {
  name: string;
  headers: ExcelHeader[];
  data: any[];
}
