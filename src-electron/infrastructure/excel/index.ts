import ExcelJS from 'exceljs';
import {CreateExcelOptions, ExcelHeader, ExcelWorkSheet} from "app/src-electron/infrastructure/excel/type";

export async function createExcel(options: CreateExcelOptions) {
  const workbook: ExcelJS.Workbook = new ExcelJS.Workbook();
  options.worksheet.forEach((it) => createWorksheet(workbook, it));
  workbook.xlsx.writeFile(options.filePath.endsWith('.xlsx') ? options.filePath : `${options.filePath}.xlsx`);
}

function createWorksheet(workbook: ExcelJS.Workbook, excelWorksheet: ExcelWorkSheet) {
  const worksheet: ExcelJS.Worksheet = workbook.addWorksheet(excelWorksheet.name);

  // 헤더 추가
  // @ts-ignore
  worksheet.columns = excelWorksheet.headers.map((it) => ({
    header: it.value,
    key: it.key,
    width: it.width,
  }));

  // 스타일 적용
  const headerRow = worksheet.getRow(1);
  headerRow.font = {
    bold: excelWorksheet.headers[0]?.bold,
    // @ts-ignore
    color: { argb: excelWorksheet.headers[0]?.color },
  }; // 헤더 폰트를 진하게

  for (let index = 0; index < excelWorksheet.headers.length; index++) {
    const excelHeader: ExcelHeader = excelWorksheet.headers[index]!;
    const cell: ExcelJS.Cell = headerRow.getCell(index + 1);

    cell.font = {
      bold: excelHeader.bold,
      // @ts-ignore
      color: { argb: excelHeader.color },
    };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      // @ts-ignore
      fgColor: { argb: excelHeader.backgroundColor }, // 옅은 초록색 (ARGB 코드)
    };
  }

  // 데이터 추가
  for (const element of excelWorksheet.data) {
    worksheet.addRow(element);
  }
}
