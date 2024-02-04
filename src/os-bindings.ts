import { ipcMain, dialog } from 'electron';
import { SelectFolderDialogResponse } from '@/vite-env';
import { deploy } from 'chia-datalayer-fs-deploy';
import ChiaDatSeeder from 'chia-dat-seeder';
import { getChiaRoot } from 'chia-root-resolver';

const chiaRoot = getChiaRoot();
const chiaDatSeeder = new ChiaDatSeeder(chiaRoot);

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

  ipcMain.handle(
    'deployStore',
    async (event, storeId, deployDir, deployMode, options = {}) => {
      if (!['replace', 'additive'].includes(deployMode)) {
        throw new Error('Invalid deploy mode. Must be "replace" or "additive"');
      }

      const deployment = await deploy(storeId, deployDir, deployMode, options);

      // Function to generate a string with a random number of spaces
      // This is so no 2 lines of the log look the same (needed for log rendering)
      const addRandomSpaces = (message) => {
        const numberOfSpaces = Math.floor(Math.random() * 10);
        return `${message}${' '.repeat(numberOfSpaces)}`;
      };

      // Function to handle sending log messages
      const handleLogMessage = (message) => {
        const modifiedMessage = addRandomSpaces(message);
        event.sender.send('logMessage', modifiedMessage);
      };

      deployment.on('info', handleLogMessage);
      deployment.on('error', handleLogMessage);
    },
  );

  ipcMain.handle('initDatSeeder', async (event) => {
    chiaDatSeeder.start();

    chiaDatSeeder.on('queueLengthChanged', (length) => {
      console.log('queueLengthChanged', length);
      event.sender.send('datFileSync', length);
    });
  });

  ipcMain.handle(
    'setDatSeederAuthCredentials',
    async (_, accessKey: string, secretKey: string) => {
      chiaDatSeeder.setAuthCredentials({
        username: accessKey,
        password: secretKey,
      });
    },
  );

  ipcMain.handle('setDatSeederServer', async (_, serverUrl: string) => {
    chiaDatSeeder.setAuthCredentials(serverUrl);
  });
}
