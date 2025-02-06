import {ipcMain} from "electron";

ipcMain.on('message-from-renderer', (event, data) => {
  console.log('📩 렌더러에서 받은 메시지:', data);
});
