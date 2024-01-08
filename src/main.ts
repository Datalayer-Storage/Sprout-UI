import { app, BrowserWindow, ipcMain } from "electron";

/**
 * importing the chia-wallet module and its typescript types
 */
import Wallet, {
  Config as WalletConfig,
  GetPrivateKeyResponse,
  SpendableCoinRequest,
  CoinRecordsByNameRequest,
  PushTxRequest,
  // @ts-ignore
} from 'chia-wallet';

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

/**
 * creates the main renderer window
 */
function createWindow() {
  declareWalletRpcHandles();
  declareDatalayerRpcHandles();

  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true
    },
  });

  if (process.env.NODE_ENV === "development") {
    win.loadURL("http://localhost:5173/");
  } else {
    win.loadFile("dist/index.html");
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

/**
 * defines the chia wallet electron IPC remote proceure calls for renderer processes to
 * invoke the chia wallet API's
 *
 * these calls are not accessible in the renderer process without being declared
 * in {@link src/preload.js}
 */
async function declareWalletRpcHandles() {
  const wallet = new Wallet();

  ipcMain.handle("walletGetConfig", () => {
    return wallet.getConfig();
  });

  ipcMain.handle("walletSetConfig", (_, config: WalletConfig) => {
    return wallet.setConfig(config);
  });

  ipcMain.handle("walletGetLoggedInFingerprint", () => {
    return wallet.getLoggedInFingerprint();
  });

  ipcMain.handle("walletGetCoinRecords", (_, options: any) => {
    return wallet.getCoinRecords(options);
  });

  ipcMain.handle(
    "walletGetPrivateKey",
    (_, getPrivateKeyResponse: GetPrivateKeyResponse, options: any) => {
      return wallet.getPrivateKey(getPrivateKeyResponse, options);
    }
  );

  ipcMain.handle(
    "walletGetCoinRecordsByName",
    (_, coinRecordsByNameRequest: CoinRecordsByNameRequest, options: any) => {
      return wallet.getCoinRecordsByName(coinRecordsByNameRequest, options);
    }
  );

  ipcMain.handle(
    "walletGetSpendableCoins",
    (_, spendableCoinRequest: SpendableCoinRequest, options?: any) => {
      return wallet.getSpendablCoins(spendableCoinRequest, options);
    }
  );

  ipcMain.handle(
    "walletPushTx",
    (_, pushTxRequest: PushTxRequest, options: any) => {
      return wallet.pushTx(pushTxRequest, options);
    }
  );
}

/**
 * defines the chia datalayer electron IPC remote proceure calls for renderer processes to
 * invoke the chia wallet API's
 *
 * these calls are not accessible in the renderer process without being declared
 * in {@link src/preload.js}
 */
async function declareDatalayerRpcHandles() {
  const datalayer = new DataLayer();

  ipcMain.handle("datalayerGetConfig", () => {
    return datalayer.getConfig();
  });

  ipcMain.handle("datalayerSetConfig", (_, config: DatalayerConfig) => {
    return datalayer.setConfig(config);
  });

  ipcMain.handle(
    "datalayerAddMirror",
    (_, addMirrorParams: AddMirrorParams, options: Options) => {
      return datalayer.addMirror(addMirrorParams, options);
    }
  );

  ipcMain.handle(
    "datalayerAddMissingFiles",
    (_, addMissingFilesParams: AddMissingFilesParams, options: Options) => {
      return datalayer.addMissingFiles(addMissingFilesParams, options);
    }
  );

  ipcMain.handle(
    "datalayerCreateDataStore",
    (_, createDataStoreParams: CreateDataStoreParams, options: Options) => {
      return datalayer.createDataStore(createDataStoreParams, options);
    }
  );

  ipcMain.handle(
    "datalayerDeleteMirror",
    (_, deleteMirrorParams: DeleteMirrorParams, options: Options) => {
      return datalayer.deleteMirror(deleteMirrorParams, options);
    }
  );

  ipcMain.handle(
    "datalayerGetKeys",
    (_, getKeysParams: GetKeysParams, options: Options) => {
      return datalayer.getKeys(getKeysParams, options);
    }
  );

  ipcMain.handle(
    "datalayerGetKeysValues",
    (_, getKeysValuesParams: GetKeysValuesParams, options: Options) => {
      return datalayer.getKeysValues(getKeysValuesParams, options);
    }
  );

  ipcMain.handle(
    "datalayerGetKvDiff",
    (_, getKvDiffParams: GetKvDiffParams, options: Options) => {
      return datalayer.getKvDiff(getKvDiffParams, options);
    }
  );

  ipcMain.handle(
    "datalayerGetMirrors",
    (_, getMirrorsParams: GetMirrorsParams, options: Options) => {
      return datalayer.getMirrors(getMirrorsParams, options);
    }
  );

  ipcMain.handle("datalayerGetOwnedStores", () => {
    return datalayer.getOwnedStores();
  });

  ipcMain.handle(
    "datalayerGetRoot",
    (_, getRootParams: GetRootParams, options: Options) => {
      return datalayer.getRoot(getRootParams, options);
    }
  );

  ipcMain.handle(
    "datalayerGetRootHistory",
    (_, getRootHistoryParams: GetRootHistoryParams, options: Options) => {
      return datalayer.getRootHistory(getRootHistoryParams, options);
    }
  );

  ipcMain.handle(
    "datalayerGetSyncStatus",
    (_, getSyncStatusParams: GetSyncStatusParams, options: Options) => {
      return datalayer.getSyncStatus(getSyncStatusParams, options);
    }
  );

  ipcMain.handle("datalayerGetSubscriptions", (_, options: Options) => {
    return datalayer.getSubscriptions(options);
  });

  ipcMain.handle(
    "datalayerGetValue",
    (_, getValueParams: GetValueParams, options: Options) => {
      return datalayer.getValue(getValueParams, options);
    }
  );

  ipcMain.handle("datalayerPlugins", (_, options: Options) => {
    return datalayer.plugins(options);
  });

  ipcMain.handle(
    "datalayerRemoveSubscriptions",
    (
      _,
      removeSubscriptionsParams: RemoveSubscriptionsParams,
      options: Options
    ) => {
      return datalayer.removeSubscriptions(removeSubscriptionsParams, options);
    }
  );

  ipcMain.handle(
    "datalayerSubscribe",
    (_, subscribeParams: SubscribeParams, options: Options) => {
      return datalayer.subscribe(subscribeParams, options);
    }
  );

  ipcMain.handle(
    "datalayerUnsubscribe",
    (_, unsubscribeParams: UnsubscribeParams, options: Options) => {
      return datalayer.unsubscribe(unsubscribeParams, options);
    }
  );

  ipcMain.handle(
    "datalayerUpdateDataStore",
    (_, batchUpdateParams: BatchUpdateParams, options: Options) => {
      return datalayer.updateDataStore(batchUpdateParams, options);
    }
  );

  ipcMain.handle(
    "datalayerWalletLogin",
    (_, walletLogInParams: WalletLogInParams, options: Options) => {
      return datalayer.walletLogin(walletLogInParams, options);
    }
  );
}
