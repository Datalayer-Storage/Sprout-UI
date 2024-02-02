interface userOptionsInitialState {
  selectedTheme: 'light' | 'dark';
  fallbackStoreProvider: string;
  accessKey: string;
  accessSecret: string;
  datalayerHost: string;
  walletHost: string;
  certificateFolderPath: string;
  defaultWalletId: number | null;
  defaultFee: number | null;
  defaultMirrorCoinAmount: number | null;
  maximumRpcPayloadSize: number | null;
  web2GatewayPort: number | null;
  web2GatewayHost: string;
  forceIp4Mirror: boolean;
  mirrorUrlOverride: string | null;
  verbose: boolean;
  numFilesProcessedPerBatch: number | null;
  ignoreOrphans: boolean;
}

const initialState: userOptionsInitialState = {
  selectedTheme: 'light',
  fallbackStoreProvider: "https://datalayer.link",
  accessKey: '',
  accessSecret: '',
  datalayerHost: "https://localhost:8562",
  walletHost: "https://localhost:9256",
  certificateFolderPath: "~/.chia/mainnet/config/ssl",
  defaultWalletId: 1, // Converted to camelCase
  defaultFee: 300000000, // Converted to camelCase
  defaultMirrorCoinAmount: 300000000, // Converted to camelCase
  maximumRpcPayloadSize: 26214400, // Converted to camelCase
  web2GatewayPort: 41410, // Converted to camelCase
  web2GatewayHost: "localhost", // Converted to camelCase
  forceIp4Mirror: true,
  mirrorUrlOverride: null, // Converted to camelCase
  verbose: false,
  numFilesProcessedPerBatch: 100, // Converted to camelCase
  ignoreOrphans: false // Converted to camelCase
};

export default initialState;

