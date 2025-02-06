import {mainWindow} from "app/src-electron/electron-main";
import {Task} from "app/type";

export function sendText(text: String) {
  mainWindow!.webContents.send('message-from-main', { time: text });
}

export function publishTaskStatus(task: Task) {
  mainWindow!.webContents.send('crawler-task', task);
}
