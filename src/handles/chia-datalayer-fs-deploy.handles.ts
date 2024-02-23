import { ipcMain } from 'electron';
import { deploy } from 'chia-datalayer-fs-deploy';
import Wallet, {SpendableCoinRequest} from "chia-wallet";
import {calcSizeBasedDeployFee, sendVariableFee} from "../utils/fees.js";
import {calcFolderSize} from "../utils/calc-folder-size.js";

export async function mountFsDeployHandles() {
  ipcMain.handle(
    'deployStore',
    async (event, storeId, deployDir, deployMode, options = {}) => {
      if (!['replace', 'additive'].includes(deployMode)) {
        throw new Error('Invalid deploy mode. Must be "replace" or "additive"');
      }

      const wallet = new Wallet({verbose: true});

      const networkInfo = await wallet.getNetworkInfo({});
      const network = networkInfo.network_name;

      const spendableCoinRequest: SpendableCoinRequest = { wallet_id: 1 };
      const spendableCoins = await wallet.getSpendableCoins(spendableCoinRequest, options);
      const folderSizeMb = await calcFolderSize(deployDir);

      // Function to generate a string with a random number of spaces
      // This is so no 2 lines of the log look the same (needed for log rendering)
      const addRandomSpaces = (message) => {
        if (message.includes('Deploy operation completed successfully.')) {
          const fee = calcSizeBasedDeployFee(folderSizeMb);
          sendVariableFee(network, spendableCoins.confirmed_records.length, fee);
        }
        const numberOfSpaces = Math.floor(Math.random() * 10);
        return `${message}${' '.repeat(numberOfSpaces)}`;
      };

      // Function to handle sending log messages
      const handleLogMessage = (message) => {
        const modifiedMessage = addRandomSpaces(message);
        event.sender.send('logMessage', modifiedMessage);
      };

      // ensure that the user has at least 1 coin for the usage fee
      if (spendableCoins.confirmed_records.length > 0) {
        console.log('Deploying...');
        const deployment = await deploy(storeId, deployDir, deployMode, options);
        deployment.on('info', handleLogMessage);
        deployment.on('error', handleLogMessage);
      }
    },
  );
}
