/**
 * This file is used specifically for security reasons.
 * Here you can access Nodejs stuff and inject functionality into
 * the renderer thread (accessible there through the "window" object)
 *
 * WARNING!
 * If you import anything from node_modules, then make sure that the package is specified
 * in package.json > dependencies and NOT in devDependencies
 *
 * Example (injects window.myAPI.doAThing() into renderer thread):
 *
 *   import { contextBridge } from 'electron'
 *
 *   contextBridge.exposeInMainWorld('myAPI', {
 *     doAThing: () => {}
 *   })
 *
 * WARNING!
 * If accessing Node functionality (like importing @electron/remote) then in your
 * electron-main.ts you will need to set the following when you instantiate BrowserWindow:
 *
 * mainWindow = new BrowserWindow({
 *   // ...
 *   webPreferences: {
 *     // ...
 *     sandbox: false // <-- to be able to import @electron/remote in preload script
 *   }
 * }
 */
import IpcRendererEvent = Electron.IpcRendererEvent;


const { contextBridge, ipcRenderer } = require('electron');

const listeners = new Map<string, (...args: any[]) => void>(); // 리스너 저장

// Electron과의 안전한 통신을 위한 브리지
contextBridge.exposeInMainWorld('$renderer', {
  async saveTextFile (text: string) {
    console.log('receive at exposeInMainWorld: ', text);
    const result = await ipcRenderer.invoke('saveTextFile', text);
    console.log('check result: ', result);
    return result;
  },

  startCrawler() {
    ipcRenderer.invoke('startCrawler');
  },

  sendToMain: (channel: string, ...data: any[]) => {
    ipcRenderer.send(channel, data);
  },

  onReceive: (channel: string, callback: (event: IpcRendererEvent, ...args: any[]) => void) => {
    const listener = (event: IpcRendererEvent, ...args: any[]) => callback(event, ...args);

    if (listeners.has(channel)) {
      ipcRenderer.removeListener(channel, listeners.get(channel));
      listeners.delete(channel);
    }

    listeners.set(channel, listener);
    ipcRenderer.on(channel, listener);

    console.log('after on receive', callback, ipcRenderer.listeners(channel));
  },

  request: async (channel: string, ...args: any[]) => {
    return ipcRenderer.invoke(channel, args);
  },

  removeListener: (channel: string) => {
    const listener = listeners.get(channel);
    if (listener) {
      ipcRenderer.removeListener(channel, listener);
      listeners.delete(channel);
    }

    console.log('after remove listener', ipcRenderer.listeners(channel));
  }


})
