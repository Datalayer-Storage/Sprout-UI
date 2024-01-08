
/* Note: while unintiutive, the ipcRenderer cannot be directly invoked from
 * renderer processses
 */
const { contextBridge, ipcRenderer } = require('electron');

/**
 * declares an API to expose the {@link ipcRenderer} for invocation
 * in renderer processes. the {@link window.walletAPI interface} is declared in 
 * {@link src/renderer/vite-env.d.ts}
 */ 
contextBridge.exposeInMainWorld(
  'walletAPI', {
        getConfig: () => {
            return ipcRenderer.invoke('walletGetConfig');
        },
        
        setConfig: (config) => {
            return ipcRenderer.invoke('walletSetConfig', config);
        },
        
        getLoggedInFingerprint: () => {
            return ipcRenderer.invoke('walletGetLoggedInFingerprint');
        },
        
        getCoinRecords: (options) => {
            return ipcRenderer.invoke('walletGetCoinRecords', options);
        },
        
        getPrivateKey: (getPrivateKeyResponse, options) => {
            return ipcRenderer.invoke('walletGetPrivateKey', getPrivateKeyResponse, options);
        },
        
        getCoinRecordsByName: (coinRecordsByNameRequest, options) => {
            return ipcRenderer.invoke('walletGetCoinRecordsByName', coinRecordsByNameRequest, options);
        },
        
        getSpendableCoins: (spendableCoinsRequest, options) => {
            return ipcRenderer.invoke('walletGetSpendableCoins', spendableCoinsRequest, options);
        },
        
        pushTx: (pushTxRequest, options) => {
            return ipcRenderer.invoke('walletPushTx', pushTxRequest, options);
        }
        
    }
)

contextBridge.exposeInMainWorld(
    'datalayerAPI', {

        getConfig: () => {
            return ipcRenderer.invoke('datalayerGetConfig');
        },
        
        setConfig: (config) => {
            return ipcRenderer.invoke('datalayerSetConfig', config);
        },
        
        addMirror: (addMirrorParams, options) => {
            return ipcRenderer.invoke('datalayerAddMirror', addMirrorParams, options);
        },
        
        addMissingFiles: (addMissingFilesParams, options) => {
            return ipcRenderer.invoke('datalayerAddMissingFiles', addMissingFilesParams, options);
        },
        
        createDataStore: (createDataStoreParams, options) => {
            return ipcRenderer.invoke('datalayerCreateDataStore', createDataStoreParams, options);
        },
        
        deleteMirror: (deleteMirrorParams, options) => {
            return ipcRenderer.invoke('datalayerDeleteMirror', deleteMirrorParams, options);
        },
        
        getKeys: (getKeysParams, options) => {
            return ipcRenderer.invoke('datalayerGetKeys', getKeysParams, options);
        },
        
        getKeysValues: (getKeysValuesParams, options) => {
            return ipcRenderer.invoke('datalayerGetKeysValues', getKeysValuesParams, options);
        },
        
        getKvDiff: (getKvDiffParams, options) => {
            return ipcRenderer.invoke('datalayerGetKvDiff', getKvDiffParams, options);
        },
        
        getMirrors: (getMirrorsParams, options) => {
            return ipcRenderer.invoke('datalayerGetMirrors', getMirrorsParams, options);
        },
        
        getOwnedStores: (options) => {
            return ipcRenderer.invoke('datalayerGetOwnedStores', options);
        },
        
        getRoot: (getRootParams, options) => {
            return ipcRenderer.invoke('datalayerGetRoot', getRootParams, options);
        },
        
        getRootHistory: (getRootHistoryParams, options) => {
            return ipcRenderer.invoke('datalayerGetRootHistory', getRootHistoryParams, options);
        },
        
        getSyncStatus: (getSyncStatusParams, options) => {
            return ipcRenderer.invoke('datalayerGetSyncStatus', getSyncStatusParams, options);
        },
        
        getSubscriptions: (options) => {
            return ipcRenderer.invoke('datalayerGetSubscriptions', options);
        },
        
        getValue: (getValueParams, options) => {
            return ipcRenderer.invoke('datalayerGetValue', getValueParams, options);
        },
        
        plugins: (options) => {
            return ipcRenderer.invoke('datalayerPlugins', options);
        },
        
        removeSubscriptions: (removeSubscriptionsParams, options) => {
            return ipcRenderer.invoke('datalayerRemoveSubscriptions', removeSubscriptionsParams, options);
        },
        
        subscribe: (subscribeParams, options) => {
            return ipcRenderer.invoke('datalayerSubscribe', subscribeParams, options);
        },
        
        unsubscribe: (unsubscribeParams, options) => {
            return ipcRenderer.invoke('datalayerUnsubscribe', unsubscribeParams, options);
        },
        
        updateDataStore: (batchUpdateParams, options) => {
            return ipcRenderer.invoke('datalayerUpdateDataStore', batchUpdateParams, options);
        },
        
        walletLogin: (walletLogInParams, options) => {
            return ipcRenderer.invoke('datalayerWalletLogin', walletLogInParams, options);
        }
        
    }
)