import { createSlice } from '@reduxjs/toolkit';
import initialState from './userOptions.initialstate';

export const userOptionsSlice = createSlice({
  name: 'userOptions',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      if (state.selectedTheme === 'light') {
        state.selectedTheme = 'dark';
      } else {
        state.selectedTheme = 'light';
      }
    },

    setFallbackStoreProvider: (state, { payload }) => {
      state.fallbackStoreProvider = payload;
    },

    setAccessKey: (state, { payload }) => {

      if ((typeof payload === 'string') && payload) {
        state.accessKey = payload;
      }else{
        console.error("invalid access key. key must be a string and must not be null");
      }
    },

    setAccessSecret: (state, { payload }) => {

      if ((typeof payload === 'string') && payload) {
        state.accessSecret = payload;
      }else{
        console.error("invalid access secret. secret must be a string and must not be null");
      }
    },

    setDatalayerHost: (state, { payload }) => {
      if ((typeof payload === 'string') && payload) {
        state.datalayerHost = payload;
      } else {
        console.error("Invalid datalayerHost. Host must be a string and must not be null");
      }
    },

    setWalletHost: (state, { payload }) => {
      if ((typeof payload === 'string') && payload) {
        state.walletHost = payload;
      } else {
        console.error("Invalid walletHost. Host must be a string and must not be null");
      }
    },

    setCertificateFolderPath: (state, { payload }) => {
      if ((typeof payload === 'string') && payload) {
        state.certificateFolderPath = payload;
      } else {
        console.error("Invalid certificateFolderPath. Path must be a string and must not be null");
      }
    },

    setDefaultWalletId: (state, { payload }) => {
      if ((typeof payload === 'number') && payload) {
        state.defaultWalletId = payload;
      } else {
        console.error("Invalid defaultWalletId. ID must be a number and must not be null");
      }
    },

    setDefaultFee: (state, { payload }) => {
      if ((typeof payload === 'number') && payload) {
        state.defaultFee = payload;
      } else {
        console.error("Invalid defaultFee. Fee must be a number and must not be null");
      }
    },

    setDefaultMirrorCoinAmount: (state, { payload }) => {
      if ((typeof payload === 'number') && payload) {
        state.defaultMirrorCoinAmount = payload;
      } else {
        console.error("Invalid defaultMirrorCoinAmount. Amount must be a number and must not be null");
      }
    },

    setMaximumRpcPayloadSize: (state, { payload }) => {
      if ((typeof payload === 'number') && payload) {
        state.maximumRpcPayloadSize = payload;
      } else {
        console.error("Invalid maximumRpcPayloadSize. Size must be a number and must not be null");
      }
    },

    setWeb2GatewayPort: (state, { payload }) => {
      if ((typeof payload === 'number') && payload) {
        state.web2GatewayPort = payload;
      } else {
        console.error("Invalid web2GatewayPort. Port must be a number and must not be null");
      }
    },

    setWeb2GatewayHost: (state, { payload }) => {
      if ((typeof payload === 'string') && payload) {
        state.web2GatewayHost = payload;
      } else {
        console.error("Invalid web2GatewayHost. Host must be a string and must not be null");
      }
    },

    toggleForceIp4Mirror: (state, { payload }) => {
      if ((typeof payload === 'boolean') && payload) {
        state.forceIp4Mirror = payload; // No change needed
      } else {
        console.error("Invalid forceIp4Mirror. Value must be a boolean and must not be null");
      }
    },

    setMirrorUrlOverride: (state, { payload }) => {
      if ((typeof payload === 'string') && payload) {
        state.mirrorUrlOverride = payload;
      } else {
        console.error("Invalid mirrorUrlOverride. URL must be a string and must not be null");
      }
    },

    toggleVerbose: (state, { payload }) => {
      if ((typeof payload === 'boolean') && payload) {
        state.verbose = payload; // No change needed
      } else {
        console.error("Invalid verbosity setting. Value must be a boolean and must not be null");
      }
    },

    setNumFilesProcessedPerBatch: (state, { payload }) => {
      if ((typeof payload === 'number') && payload) {
        state.numFilesProcessedPerBatch = payload;
      } else {
        console.error("Invalid numFilesProcessedPerBatch. Value must be a number and must not be null");
      }
    },

    toggleIgnoreOrphans: (state, { payload }) => {
      if ((typeof payload === 'boolean') && payload) {
        state.ignoreOrphans = payload; // No change needed
      } else {
        console.error("Invalid ignoreOrphans. Value must be a boolean and must not be null");
      }
    },
  },
});

export const {
  toggleTheme,
  setAccessKey,
  setAccessSecret,
  setFallbackStoreProvider,
  setDatalayerHost,
  setWalletHost,
  setCertificateFolderPath,
  setDefaultWalletId,
  setDefaultFee,
  setDefaultMirrorCoinAmount,
  setMaximumRpcPayloadSize,
  setWeb2GatewayPort,
  setWeb2GatewayHost,
  toggleForceIp4Mirror,
  setMirrorUrlOverride,
  toggleVerbose,
  setNumFilesProcessedPerBatch,
  toggleIgnoreOrphans
} = userOptionsSlice.actions;

export default userOptionsSlice.reducer;
