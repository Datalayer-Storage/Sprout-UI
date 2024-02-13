import { ipcMain } from 'electron';

/**
 * importing the chia-wallet module and its typescript types
 */
import Wallet, {
  Config as WalletConfig,
  GetPrivateKeyRequest,
  SpendableCoinRequest,
  CoinRecordsByNameRequest,
  PushTxRequest,
  // @ts-ignore
} from 'chia-wallet';

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
    (_, getPrivateKeyResponse: GetPrivateKeyRequest, options: any) => {
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
      return wallet.getSpendableCoins(spendableCoinRequest, options);
    },
  );

  ipcMain.handle(
    'walletPushTx',
    (_, pushTxRequest: PushTxRequest, options: any) => {
      return wallet.pushTx(pushTxRequest, options);
    },
  );

  ipcMain.handle('walletGetSyncStatus', (_, options: any) => {
    return wallet.getSyncStatus(options);
  });

  ipcMain.handle('walletGetWalletBalance', (_, options: any) => {
    return wallet.getWalletBalance({ wallet_id: 1 }, options);
  });

  ipcMain.handle('walletGetTransactions', async (_, options: any) => {
    return await wallet.getTransactions({ wallet_id: 1 }, options);
  });
}
