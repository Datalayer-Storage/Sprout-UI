import { ipcMain } from 'electron';

/**
 * importing the chia-datalayer module and its typescript types
 */
import DataLayer, {
  Config as DatalayerConfig /* the config type is common to both the chia wallet and chia datalayer */,
  AddMirrorParams,
  AddMissingFilesParams,
  BatchUpdateParams,
  CreateDataStoreParams,
  DeleteMirrorParams,
  GetKeysParams,
  GetKeysValuesParams,
  GetKvDiffParams,
  GetMirrorsParams,
  GetRootParams,
  GetRootHistoryParams,
  GetSyncStatusParams,
  GetValueParams,
  Options,
  RemoveSubscriptionsParams,
  SubscribeParams,
  UnsubscribeParams,
  WalletLogInParams,
  // @ts-ignore
} from 'chia-datalayer';

import Wallet, {
  SpendableCoinRequest,
  SendTransactionRequest
} from 'chia-wallet';

export async function mountDatalayerRpcHandles() {
  const datalayer = new DataLayer({verbose: true});
  const wallet = new Wallet({verbose: true})

  ipcMain.handle('datalayerGetConfig', () => {
    return datalayer.getConfig();
  });

  ipcMain.handle('datalayerSetConfig', (_, config: DatalayerConfig) => {
    return datalayer.setConfig(config);
  });

  ipcMain.handle(
    'datalayerAddMirror',
    (_, addMirrorParams: AddMirrorParams, options: Options) => {
      return datalayer.addMirror(addMirrorParams, options);
    },
  );

  ipcMain.handle(
    'datalayerAddMissingFiles',
    (_, addMissingFilesParams: AddMissingFilesParams, options: Options) => {
      return datalayer.addMissingFiles(addMissingFilesParams, options);
    },
  );

  ipcMain.handle(
    'datalayerCreateDataStore',
    async (_, createDataStoreParams: CreateDataStoreParams, options: Options) => {

      const networkInfo = await wallet.getNetworkInfo({});
      const network = networkInfo.network_name;

      const spendableCoinRequest: SpendableCoinRequest = { wallet_id: 1 };
      const spendableCoins = await wallet.getSpendableCoins(spendableCoinRequest);
      const usageFee: number = 0.01;

      // ensure that the user has at least 2 coins: 1 for the usage fee and 1 for the datastore fee
      if (spendableCoins.confirmed_records.length > 0) {

        if (network === 'mainnet' && spendableCoins.confirmed_records.length > 1){
          const request: SendTransactionRequest = {
            wallet_id: 1,
            address: 'xch1djjwc54ax3gz4n5fthkt5q4nhgerlx8e5n92435gr3scdsxrcf6sh55z5w',
            amount: usageFee
          };
          await wallet.sendTransaction(request);
        }

        setTimeout(() => {
          return datalayer.createDataStore(createDataStoreParams, options);
        }, 1000);
      } else {
        return {
          success: false,
          message: "Insufficient coins. Please ensure that you have at least 1 spendable coin in your wallet."
        }
      }
    },
  );

  ipcMain.handle(
    'datalayerDeleteMirror',
    (_, deleteMirrorParams: DeleteMirrorParams, options: Options) => {
      return datalayer.deleteMirror(deleteMirrorParams, options);
    },
  );

  ipcMain.handle(
    'datalayerGetKeys',
    (_, getKeysParams: GetKeysParams, options: Options) => {
      return datalayer.getKeys(getKeysParams, options);
    },
  );

  ipcMain.handle(
    'datalayerGetKeysValues',
    (_, getKeysValuesParams: GetKeysValuesParams, options: Options) => {
      return datalayer.getKeysValues(getKeysValuesParams, options);
    },
  );

  ipcMain.handle(
    'datalayerGetKvDiff',
    (_, getKvDiffParams: GetKvDiffParams, options: Options) => {
      return datalayer.getKvDiff(getKvDiffParams, options);
    },
  );

  ipcMain.handle(
    'datalayerGetMirrors',
    (_, getMirrorsParams: GetMirrorsParams, options: Options) => {
      return datalayer.getMirrors(getMirrorsParams, options);
    },
  );

  ipcMain.handle('datalayerGetOwnedStores', () => {
    return datalayer.getOwnedStores();
  });

  ipcMain.handle(
    'datalayerGetRoot',
    (_, getRootParams: GetRootParams, options: Options) => {
      return datalayer.getRoot(getRootParams, options);
    },
  );

  ipcMain.handle(
    'datalayerGetRootHistory',
    (_, getRootHistoryParams: GetRootHistoryParams, options: Options) => {
      return datalayer.getRootHistory(getRootHistoryParams, options);
    },
  );

  ipcMain.handle(
    'datalayerGetSyncStatus',
    (_, getSyncStatusParams: GetSyncStatusParams, options: Options) => {
      return datalayer.getSyncStatus(getSyncStatusParams, options);
    },
  );

  ipcMain.handle('datalayerGetSubscriptions', (_, options: Options) => {
    return datalayer.getSubscriptions(options);
  });

  ipcMain.handle(
    'datalayerGetValue',
    (_, getValueParams: GetValueParams, options: Options) => {
      return datalayer.getValue(getValueParams, options);
    },
  );

  ipcMain.handle('datalayerPlugins', (_, options: Options) => {
    return datalayer.plugins(options);
  });

  ipcMain.handle(
    'datalayerRemoveSubscriptions',
    (
      _,
      removeSubscriptionsParams: RemoveSubscriptionsParams,
      options: Options,
    ) => {
      return datalayer.removeSubscriptions(removeSubscriptionsParams, options);
    },
  );

  ipcMain.handle(
    'datalayerSubscribe',
    (_, subscribeParams: SubscribeParams, options: Options) => {
      return datalayer.subscribe(subscribeParams, options);
    },
  );

  ipcMain.handle(
    'datalayerUnsubscribe',
    (_, unsubscribeParams: UnsubscribeParams, options: Options) => {
      return datalayer.unsubscribe(unsubscribeParams, options);
    },
  );

  ipcMain.handle(
    'datalayerUpdateDataStore',
    (_, batchUpdateParams: BatchUpdateParams, options: Options) => {
      return datalayer.updateDataStore(batchUpdateParams, options);
    },
  );

  ipcMain.handle(
    'datalayerWalletLogin',
    (_, walletLogInParams: WalletLogInParams, options: Options) => {
      return datalayer.walletLogin(walletLogInParams, options);
    },
  );
}
