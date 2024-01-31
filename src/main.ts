import {app, BrowserWindow, ipcMain} from "electron";
import path from 'path';
import { fileURLToPath } from 'url';
import { startWeb2Gateway } from './web2gateway.js';
import { mountDatalayerRpcHandles } from "./datalayer-bindings.js";
import { mountWalletRpcHandles } from "./wallet-bindings.js";
//import {mountOsHandles} from "./os-bindings";

//todo: remove when exporting from os-bindings.ts is working
import {dialog} from 'electron';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * creates the main renderer window
 */
function createWindow() {
  startWeb2Gateway();
  mountDatalayerRpcHandles();
  mountWalletRpcHandles();
  //mountOsHandles();

  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      webviewTag: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:5173/');
  } else {
    win.loadFile('dist/index.html');
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});


//todo: remove when exporting from os-bindings.ts is working
ipcMain.handle('selectFolderDialog', async () => {
  try {
    const result = await dialog.showOpenDialog({
      properties: ['openDirectory'],
    });
    return { data: result.filePaths[0], error: null, success: true };
  } catch (error) {
    return { data: null, error, success: false };
  }
});


