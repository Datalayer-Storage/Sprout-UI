/// <reference types="vite/client" />

/**
 * interface to add the wallet and datalayer ipc API's to the electron
 * Window module.
 */
interface Window {
  walletAPI: any;
  datalayerAPI: DatalayerAPI;
}

export interface SelectFolderDialogResponse {
  filePath: string;
  error: Error | null;
  success: boolean;
}