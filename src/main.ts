import { app, BrowserWindow, shell } from 'electron';
import path from 'path';
import express from 'express';

const serverPort = 61310;
const appServer = express();

const buildPath = path.join(app.getAppPath(), 'build/renderer'); // Path to your Vite build

appServer.use(express.static(buildPath)); // Serve static files from the build directory

// Catch-all handler to return index.html for any non-static file request
appServer.get('*', (_, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

appServer.listen(serverPort);

// Import additional modules
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
      // preload: path.join(__dirname, 'preload.js'),
    },
  });

  // Load URL based on the environment
  const loadUrl = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:5173/' // Development URL
    : `http://localhost:${serverPort}/`; // Production URL served by Express

  win.loadURL(loadUrl);

  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
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
