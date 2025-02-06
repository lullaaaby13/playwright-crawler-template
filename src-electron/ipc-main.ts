import {dialog, ipcMain, SaveDialogOptions} from 'electron';
import {promises as fsp} from 'fs';

ipcMain.handle('saveTextFile', async (event, text: string) => {
  console.log('received from AppElectronController', text);
  const options: SaveDialogOptions = {}
  const r = await dialog.showSaveDialog(options);
  if (!r.filePath) throw Error('cancel');
  await fsp.writeFile(r.filePath, text);
  return r.filePath;
});
