import { app, BrowserWindow, ipcMain } from "electron";
/**
 * importing the chia-wallet module and its typescript types
 */
import Wallet from 'chia-wallet';
/**
 * importing the chia-datalayer module and its typescript types
 */
import DataLayer from 'chia-datalayer';
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
            nodeIntegration: true,
            webviewTag: true
        },
    });
    if (process.env.NODE_ENV === "development") {
        win.loadURL("http://localhost:5173/");
    }
    else {
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
    ipcMain.handle("walletSetConfig", (_, config) => {
        return wallet.setConfig(config);
    });
    ipcMain.handle("walletGetLoggedInFingerprint", () => {
        return wallet.getLoggedInFingerprint();
    });
    ipcMain.handle("walletGetCoinRecords", (_, options) => {
        return wallet.getCoinRecords(options);
    });
    ipcMain.handle("walletGetPrivateKey", (_, getPrivateKeyResponse, options) => {
        return wallet.getPrivateKey(getPrivateKeyResponse, options);
    });
    ipcMain.handle("walletGetCoinRecordsByName", (_, coinRecordsByNameRequest, options) => {
        return wallet.getCoinRecordsByName(coinRecordsByNameRequest, options);
    });
    ipcMain.handle("walletGetSpendableCoins", (_, spendableCoinRequest, options) => {
        return wallet.getSpendablCoins(spendableCoinRequest, options);
    });
    ipcMain.handle("walletPushTx", (_, pushTxRequest, options) => {
        return wallet.pushTx(pushTxRequest, options);
    });
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
    ipcMain.handle("datalayerSetConfig", (_, config) => {
        return datalayer.setConfig(config);
    });
    ipcMain.handle("datalayerAddMirror", (_, addMirrorParams, options) => {
        return datalayer.addMirror(addMirrorParams, options);
    });
    ipcMain.handle("datalayerAddMissingFiles", (_, addMissingFilesParams, options) => {
        return datalayer.addMissingFiles(addMissingFilesParams, options);
    });
    ipcMain.handle("datalayerCreateDataStore", (_, createDataStoreParams, options) => {
        return datalayer.createDataStore(createDataStoreParams, options);
    });
    ipcMain.handle("datalayerDeleteMirror", (_, deleteMirrorParams, options) => {
        return datalayer.deleteMirror(deleteMirrorParams, options);
    });
    ipcMain.handle("datalayerGetKeys", (_, getKeysParams, options) => {
        return datalayer.getKeys(getKeysParams, options);
    });
    ipcMain.handle("datalayerGetKeysValues", (_, getKeysValuesParams, options) => {
        return datalayer.getKeysValues(getKeysValuesParams, options);
    });
    ipcMain.handle("datalayerGetKvDiff", (_, getKvDiffParams, options) => {
        return datalayer.getKvDiff(getKvDiffParams, options);
    });
    ipcMain.handle("datalayerGetMirrors", (_, getMirrorsParams, options) => {
        return datalayer.getMirrors(getMirrorsParams, options);
    });
    ipcMain.handle("datalayerGetOwnedStores", () => {
        return datalayer.getOwnedStores();
    });
    ipcMain.handle("datalayerGetRoot", (_, getRootParams, options) => {
        return datalayer.getRoot(getRootParams, options);
    });
    ipcMain.handle("datalayerGetRootHistory", (_, getRootHistoryParams, options) => {
        return datalayer.getRootHistory(getRootHistoryParams, options);
    });
    ipcMain.handle("datalayerGetSyncStatus", (_, getSyncStatusParams, options) => {
        return datalayer.getSyncStatus(getSyncStatusParams, options);
    });
    ipcMain.handle("datalayerGetSubscriptions", (_, options) => {
        return datalayer.getSubscriptions(options);
    });
    ipcMain.handle("datalayerGetValue", (_, getValueParams, options) => {
        return datalayer.getValue(getValueParams, options);
    });
    ipcMain.handle("datalayerPlugins", (_, options) => {
        return datalayer.plugins(options);
    });
    ipcMain.handle("datalayerRemoveSubscriptions", (_, removeSubscriptionsParams, options) => {
        return datalayer.removeSubscriptions(removeSubscriptionsParams, options);
    });
    ipcMain.handle("datalayerSubscribe", (_, subscribeParams, options) => {
        return datalayer.subscribe(subscribeParams, options);
    });
    ipcMain.handle("datalayerUnsubscribe", (_, unsubscribeParams, options) => {
        return datalayer.unsubscribe(unsubscribeParams, options);
    });
    ipcMain.handle("datalayerUpdateDataStore", (_, batchUpdateParams, options) => {
        return datalayer.updateDataStore(batchUpdateParams, options);
    });
    ipcMain.handle("datalayerWalletLogin", (_, walletLogInParams, options) => {
        return datalayer.walletLogin(walletLogInParams, options);
    });
}
