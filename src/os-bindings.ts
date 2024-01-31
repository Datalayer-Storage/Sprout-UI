import { ipcMain } from 'electron';
import dialog = Electron.dialog;

export async function mountOsHandles() {
  ipcMain.handle('selectFolderDialogue', () => {
    try {
      dialog.showOpenDialog({
        properties: ['openDirectory'],
      }).then((result) => {
        if (result.canceled){
          return { data: null, error: null, success: false };
        }else{
          return { data: result.filePaths[0], error: null, success: true };
        }
      });

    } catch (error) {
      return { data: null, error, success: false };
    }
  })
}