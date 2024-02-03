import { createSlice, current } from '@reduxjs/toolkit';
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
      if (typeof payload === 'string' && payload) {
        state.accessKey = payload;
      } else {
        console.error(
          'invalid access key. key must be a string and must not be null',
        );
      }
    },

    setStoreLabel: (state, { payload }) => {
      state.storeLabels[payload.storeId] = payload.label;
    },

    setProjectPath: (state, { payload }) => {
      state.storeProjectFolders[payload.storeId] = payload.label;
    },

    setAccessSecret: (state, { payload }) => {
      if (typeof payload === 'string' && payload) {
        state.accessSecret = payload;
      } else {
        console.error(
          'invalid access secret. secret must be a string and must not be null',
        );
      }
    },

    setDatalayerHost: (state, { payload }) => {
      if (typeof payload === 'string' && payload) {
        state.deployOptions.datalayerHost = payload;
      } else {
        console.error(
          'Invalid datalayerHost. Host must be a string and must not be null',
        );
      }
    },

    setWalletHost: (state, { payload }) => {
      if (typeof payload === 'string' && payload) {
        state.deployOptions.walletHost = payload;
      } else {
        console.error(
          'Invalid walletHost. Host must be a string and must not be null',
        );
      }
    },

    setCertificateFolderPath: (state, { payload }) => {
      if (typeof payload === 'string' && payload) {
        state.deployOptions.certificateFolderPath = payload;
      } else {
        console.error(
          'Invalid certificateFolderPath. Path must be a string and must not be null',
        );
      }
    },

    setDefaultWalletId: (state, { payload }) => {
      try {
        const value = parseInt(payload);
        if (Number.isNaN(value)) {
          state.deployOptions.defaultWalletId = null;
        } else {
          state.deployOptions.defaultWalletId = value;
        }
      } catch (error) {
        console.error(
          'Invalid defaultWalletId. ID must be a number and must not be null',
          error,
        );
      }
    },

    setDefaultFee: (state, { payload }) => {
      try {
        const value = parseInt(payload);
        if (Number.isNaN(value)) {
          state.deployOptions.defaultFee = null;
        } else {
          state.deployOptions.defaultFee = value;
        }
      } catch (error) {
        console.error(
          'Invalid defaultFee. Fee must be a number and must not be null',
          error,
        );
      }
    },

    setDefaultMirrorCoinAmount: (state, { payload }) => {
      try {
        const value = parseInt(payload);
        if (Number.isNaN(value)) {
          state.deployOptions.defaultMirrorCoinAmount = null;
        } else {
          state.deployOptions.defaultMirrorCoinAmount = value;
        }
      } catch (error) {
        console.error(
          'Invalid defaultMirrorCoinAmount. Amount must be a number and must not be null',
          error,
        );
      }
    },

    setMaximumRpcPayloadSize: (state, { payload }) => {
      try {
        const value = parseInt(payload);
        if (Number.isNaN(value)) {
          state.deployOptions.maximumRpcPayloadSize = null;
        } else {
          state.deployOptions.maximumRpcPayloadSize = value;
        }
      } catch (error) {
        console.error(
          'Invalid maximumRpcPayloadSize. Size must be a number and must not be null',
          error,
        );
      }
    },

    setWeb2GatewayPort: (state, { payload }) => {
      try {
        const value: number = parseInt(payload);
        if (Number.isNaN(value)) {
          state.deployOptions.web2GatewayPort = null;
        } else {
          state.deployOptions.web2GatewayPort = value;
        }
      } catch (error) {
        console.error(
          'Invalid web2GatewayPort. Port must be a number and must not be null',
          error,
        );
      }
    },

    setWeb2GatewayHost: (state, { payload }) => {
      if (typeof payload === 'string' && payload) {
        state.deployOptions.web2GatewayHost = payload;
      } else {
        console.error(
          'Invalid web2GatewayHost. Host must be a string and must not be null',
        );
      }
    },

    toggleForceIp4Mirror: (state, { payload }) => {
      if (typeof payload === 'boolean' && payload) {
        state.deployOptions.forceIp4Mirror = payload; // No change needed
      } else {
        console.error(
          'Invalid forceIp4Mirror. Value must be a boolean and must not be null',
        );
      }
    },

    setMirrorUrlOverride: (state, { payload }) => {
      if (payload === '') {
        state.deployOptions.mirrorUrlOverride = null;
      } else {
        state.deployOptions.mirrorUrlOverride = payload;
      }
    },

    toggleVerbose: (state) => {
      state.deployOptions.verbose = !current(state).deployOptions.verbose;
    },

    setNumFilesProcessedPerBatch: (state, { payload }) => {
      try {
        state.deployOptions.numFilesProcessedPerBatch = parseInt(payload);
      } catch (error) {
        console.error(
          'Invalid numFilesProcessedPerBatch. Value must not be null',
          error,
        );
      }
    },

    toggleIgnoreOrphans: (state) => {
      state.deployOptions.ignoreOrphans = !current(state).deployOptions.ignoreOrphans;
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
  toggleIgnoreOrphans,
  setStoreLabel,
  setProjectPath,
} = userOptionsSlice.actions;

export default userOptionsSlice.reducer;
