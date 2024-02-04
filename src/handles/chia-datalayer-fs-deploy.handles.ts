import { ipcMain } from 'electron';
import { deploy } from 'chia-datalayer-fs-deploy';

export async function mountFsDeployHandles() {
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
}
