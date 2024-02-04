import { ipcMain, dialog } from 'electron';
import { SelectFolderDialogResponse } from '@/vite-env';

export async function mountOsHandles() {
  ipcMain.handle(
    'selectFolderDialog',
    async (): Promise<SelectFolderDialogResponse> => {
      try {
        const result = await dialog.showOpenDialog({
          properties: ['openDirectory'],
        });
        return { filePath: result.filePaths[0], error: null, success: true };
      } catch (error: any) {
        return { filePath: '', error, success: false };
      }
    },
  );
}
