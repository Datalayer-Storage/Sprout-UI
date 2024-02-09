import { ipcMain } from 'electron';
import { deploy } from 'chia-datalayer-fs-deploy';
import Wallet, {SendTransactionRequest, SpendableCoinRequest} from "chia-wallet";

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
      const usageFee: number = 0.01;

      // ensure that the user has at least 2 coins: 1 for the usage fee and 1 for the datastore fee
      if (spendableCoins.confirmed_records.length > 1) {

        if (network === 'mainnet'){
          const request: SendTransactionRequest = {
            wallet_id: 1,
            address: 'xch1djjwc54ax3gz4n5fthkt5q4nhgerlx8e5n92435gr3scdsxrcf6sh55z5w',
            amount: usageFee
          };
          await wallet.sendTransaction(request);
        }

        setTimeout(async () => {
          const deployment = await deploy(storeId, deployDir, deployMode, options);
          deployment.on('info', handleLogMessage);
          deployment.on('error', handleLogMessage);
        }, 1000);
      }

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
    },
  );
}
