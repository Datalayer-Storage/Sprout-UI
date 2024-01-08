/// <reference types="vite/client" />

/**
 * interface to add the wallet and datalayer ipc API's to the electron
 * Window module.
 */
interface Window {
  walletAPI: any;
  datalayerAPI: DatalayerAPI;
}

/**
 * interface defining the methods available in the IPC walletAPI and thier
 * parameter types
 * the walletAPI is defined in {@link src/preload.js}
 */
interface WalletAPI {
  getConfig(): Config;
  setConfig(config: Config): void;
  getLoggedInFingerprint(options?: any): any;
  getCoinRecords(options?: any): any;
  getPrivateKey(params: GetPrivateKeyResponse, options?: any): any;
  getCoinRecordsByName(params: CoinRecordsByNameRequest, options?: any): any;
  getSpendablCoins(params: SpendableCoinRequest, options?: any): any;
  pushTx(params: PushTxRequest, options?: any): any;
}

/**
 * interface defining the methods available in the IPC datalayerAPI and thier
 * parameter types
 * the datalayerAPI is defined in {@link src/preload.js}
 */
interface DatalayerAPI {
  getConfig(): Config;
  setConfig(config: Config): void;
  addMirror(params: AddMirrorParams, options?: Options);
  addMissingFiles(params: AddMissingFilesParams, options?: Options);
  createDataStore(params?: CreateDataStoreParams, options?: Options);
  deleteMirror(params: DeleteMirrorParams, options?: Options);
  getKeys(params: GetKeysParams, options?: Options);
  getKeysValues(params: GetKeysValuesParams, options?: Options);
  getKvDiff(params: GetKvDiffParams, options?: Options);
  getMirrors(params: GetMirrorsParams, options?: Options);
  getOwnedStores(options?: Options);
  getRoot(params: GetRootParams, options?: Options);
  getRootHistory(params: GetRootHistoryParams, options?: Options);
  getSyncStatus(params: GetSyncStatusParams, options?: Options);
  getSubscriptions(options?: Options);
  getValue(params: GetValueParams, options?: Options);
  plugins(options?: Options);
  removeSubscriptions(params: RemoveSubscriptionsParams, options?: Options);
  subscribe(params: SubscribeParams, options?: Options);
  unsubscribe(params: UnsubscribeParams, options?: Options);
  updateDataStore(params: BatchUpdateParams, options?: Options);
  walletLogin(params: WalletLogInParams, options?: Options);
}
