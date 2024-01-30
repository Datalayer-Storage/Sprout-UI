import { ipcMain } from 'electron';

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
 * defines the chia wallet electron IPC remote proceure calls for renderer processes to
 * invoke the chia wallet API's
 *
 * these calls are not accessible in the renderer process without being declared
 * in {@link src/preload.js}
 */
export async function mountWalletRpcHandles() {
  const wallet = new Wallet();

  ipcMain.handle('walletGetConfig', () => {
    return wallet.getConfig();
  });

  ipcMain.handle('walletSetConfig', (_, config: WalletConfig) => {
    return wallet.setConfig(config);
  });

  ipcMain.handle('walletGetLoggedInFingerprint', () => {
    return wallet.getLoggedInFingerprint();
  });

  ipcMain.handle('walletGetCoinRecords', (_, options: any) => {
    return wallet.getCoinRecords(options);
  });

  ipcMain.handle(
    'walletGetPrivateKey',
    (_, getPrivateKeyResponse: GetPrivateKeyResponse, options: any) => {
      return wallet.getPrivateKey(getPrivateKeyResponse, options);
    },
  );

  ipcMain.handle(
    'walletGetCoinRecordsByName',
    (_, coinRecordsByNameRequest: CoinRecordsByNameRequest, options: any) => {
      return wallet.getCoinRecordsByName(coinRecordsByNameRequest, options);
    },
  );

  ipcMain.handle(
    'walletGetSpendableCoins',
    (_, spendableCoinRequest: SpendableCoinRequest, options?: any) => {
      return wallet.getSpendablCoins(spendableCoinRequest, options);
    },
  );

  ipcMain.handle(
    'walletPushTx',
    (_, pushTxRequest: PushTxRequest, options: any) => {
      return wallet.pushTx(pushTxRequest, options);
    },
  );

  ipcMain.handle(
    'getSyncStatus',
    (_, options: any) => {
    return wallet.getSyncStatus(options);
  });

  ipcMain.handle(
    'getWalletBalance',
    (_, options: any) => {
    return wallet.getWalletBalance(options);
  })
}
