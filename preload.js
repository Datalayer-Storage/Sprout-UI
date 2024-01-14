const { contextBridge, ipcRenderer } = require('electron');

window.addEventListener('dom-ready', () => {
  const mimeType = document.contentType;

  // Send the MIME type to the renderer process
  ipcRenderer.sendToHost('mimeType', mimeType);
});
