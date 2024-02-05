import { app, BrowserWindow } from 'electron';
import path from 'path';
import express from 'express';

const serverPort = 61310;
const appServer = express();

appServer.use(express.static(path.join(app.getAppPath(), 'build/renderer'))); // Path to your Vite build
appServer.listen(serverPort);

// Because of weirdness with tsc you need to include the .js extension
import { startWeb2Gateway } from './web2gateway.js';
import { mountHandles } from './handles/index.js';

function createWindow() {
  startWeb2Gateway();
  mountHandles();

  const win = new BrowserWindow({
    width: 1100,
    height: 650,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      webviewTag: true,
      //preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:5173/');
  } else {
    win.loadURL(`http://localhost:${serverPort}/`);
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
