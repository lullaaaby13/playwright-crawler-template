import {dialog, ipcMain, SaveDialogOptions} from 'electron';
import {stockRepository} from "app/src-electron/application/repository";
import {configuration, configurationService} from "app/src-electron/config/config";
import {crawlerExecutor} from "app/src-electron/application/crawler";
import {createExcel} from "app/src-electron/infrastructure/excel";
import {excelHeaders} from "app/src-electron/application/excel";

ipcMain.handle('request.post.start-crawler', async (event) => {
  await crawlerExecutor.run();
});

ipcMain.handle('request.get.data', async (event) => {
  return stockRepository.findAll();
});

ipcMain.handle('request.delete.data', async (event) => {
  return stockRepository.deleteAll();
});

ipcMain.handle('request.get.configuration', async (event) => {
  return configuration;
});

ipcMain.handle('request.put.configuration', async (event, data) => {
  for (const key of Object.keys(data[0])) {
    await configurationService.update(key, data[0][key]);
  }
});

ipcMain.handle('request.get.excel-download', async (event, request) => {

  const options: SaveDialogOptions = {}
  const dialogReturnValue = await dialog.showSaveDialog(options);

  if (dialogReturnValue.filePath) {
    const filePath = !dialogReturnValue.filePath.endsWith('.xlsx') ? `${dialogReturnValue.filePath}.xlsx` : dialogReturnValue.filePath;
    await createExcel({
      filePath: filePath,
      worksheet: [
        {
          name: 'stock',
          headers: excelHeaders,
          data: JSON.parse(request),
        }
      ]
    });
  }
});
