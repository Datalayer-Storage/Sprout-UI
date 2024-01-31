import { ipcMain } from 'electron';
import dialog = Electron.dialog;

export async function mountOsHandles() {
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
}