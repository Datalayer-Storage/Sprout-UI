
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
            return ipcRenderer.invoke('getConfig');
        },

        setConfig: () => {
            return ipcRenderer.invoke('setConfig', config);
        },
        
        getLoggedInFingerprint: () => {
            return ipcRenderer.invoke('getLoggedInFingerprint');
        },

        getCoinRecords: () => {
            return ipcRenderer.invoke('getCoinRecords', options);
        },

        getPrivateKey: () => {
            return ipcRenderer.invoke('getPrivateKey', getPrivateKeyResponse, options);
        },

        getCoinRecordsByName: () => {
            return ipcRenderer.invoke('getCoinRecordsByName', coinRecordsByNameRequest, options);
        },

        getSpendableCoins: (spendableCoinsRequest, options) => {
            return ipcRenderer.invoke('getSpendableCoins', spendableCoinsRequest, options);
        },

        pushTx: (pushTxRequest, options) => {
            return ipcRenderer.invoke('pushTx', pushTxRequest, options);
        }
    }
)

contextBridge.exposeInMainWorld(
    'datalayerAPI', {
        getConfig: () => {
            return ipcRenderer.invoke('getConfig');
        },

        setConfig: (config) => {
            return ipcRenderer.invoke('setConfig', config);
        },

        addMirror: (addMirrorParams, options) => {
            return ipcRenderer.invoke('addMirror', addMirrorParams, options);
        },

        addMissingFiles: (addMissingFilesParams, options) => {
            return ipcRenderer.invoke('addMissingFiles', addMissingFilesParams, options);
        },

        createDataStore: (createDataStoreParams, options) => {
            return ipcRenderer.invoke('createDataStore', createDataStoreParams, options);
        },

        deleteMirror: (deleteMirrorParams, options) => {
            return ipcRenderer.invoke('deleteMirror', deleteMirrorParams, options);
        },

        getKeys: (getKeysParams, options) => {
            return ipcRenderer.invoke('getKeys', getKeysParams, options);
        },

        getKeysValues: (getKeysValuesParams, options) => {
            return ipcRenderer.invoke('getKeysValues', getKeysValuesParams, options);
        },

        getKvDiff: (getKvDiffParams, options) => {
            return ipcRenderer.invoke('getKvDiff', getKvDiffParams, options);
        },

        getMirrors: (getMirrorsParams, options) => {
            return ipcRenderer.invoke('getMirrors', getMirrorsParams, options);
        },

        getOwnedStores: (options) => {
            return ipcRenderer.invoke('getOwnedStores', options);
        },

        getRoot: (getRootParams, options) => {
            return ipcRenderer.invoke('getRoot', getRootParams, options);
        },

        getRootHistory: (getRootHistoryParams, options) => {
            return ipcRenderer.invoke('getRootHistory', getRootHistoryParams, options);
        },

        getSyncStatus: (getSyncStatusParams, options) => {
            return ipcRenderer.invoke('getSyncStatus', getSyncStatusParams, options);
        },

        getSubscriptions: (options) => {
            return ipcRenderer.invoke('getSubscriptions', options);
        },

        getValue: (getValueParams, options) => {
            return ipcRenderer.invoke('getValue', getValueParams, options);
        },

        plugins: (options) => {
            return ipcRenderer.invoke('plugins', options);
        },

        removeSubscriptions: (removeSubscriptionsParams, options) => {
            return ipcRenderer.invoke('removeSubscriptions', removeSubscriptionsParams, options);
        },

        subscribe: (subscribeParams, options) => {
            return ipcRenderer.invoke('subscribe', subscribeParams, options);
        },

        unsubscribe: (unsubscribeParams, options) => {
            return ipcRenderer.invoke('unsubscribe', unsubscribeParams, options);
        },

        updateDataStore: (batchUpdateParams, options) => {
            return ipcRenderer.invoke('updateDataStore', batchUpdateParams, options);
        },

        walletLogin: (walletLogInParams, options) => {
            return ipcRenderer.invoke('walletLogin', walletLogInParams, options);
        }
    }
)