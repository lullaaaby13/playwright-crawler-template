import {ExcelHeader} from "app/src-electron/infrastructure/excel/type";
import {configuration} from "app/src-electron/config/config";
import {createExcel} from "app/src-electron/infrastructure/excel";
import {resolve} from "path";
import appRootPath from "app-root-path";
import {AutoExcelGenerator} from "app/src-electron/core/excel";
import {stockRepository} from "app/src-electron/application/repository";

export const excelHeaders: ExcelHeader[] = [
  {
    key: 'code',
    value: '코드',
    width: 20,
    color: 'FFFFFF',
    bold: true,
    backgroundColor: '4caf50',
  },
  {
    key: 'name',
    value: '주식명',
    width: 40,
    color: 'FFFFFF',
    bold: true,
    backgroundColor: '4caf50',

  },
  {
    key: 'price',
    value: '현재가',
    width: 20,
    color: 'FFFFFF',
    bold: true,
    backgroundColor: '4caf50',
  },
]

class AutoExcelGeneratorImpl implements AutoExcelGenerator {

  async generate(): Promise<void> {
    if (!configuration.useAutoExcel) return;
    await createExcel({
      filePath: resolve(appRootPath.path, configuration.excelFileName),
      worksheet: [
        {
          name: 'sheet1',
          headers: excelHeaders,
          data: await stockRepository.findAll(),
        }
      ]
    });
  }
}

export const autoExcelGenerator = new AutoExcelGeneratorImpl();
