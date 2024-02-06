import { createSlice, current } from '@reduxjs/toolkit';
import initialState from './userOptions.initialstate';
import {DeploymentSettingPayload} from "@/components";

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

    setDeploymentSetting: (state, { payload }) => {

      const { settingKey, value }: DeploymentSettingPayload = payload;

      if (settingKey){
        if (typeof value === 'boolean' && (typeof settingKey === typeof state.deployOptions[settingKey])) {
          state.deployOptions[settingKey] = value;
        }else if (typeof value === 'string') {

          const numericValue: number = parseInt(value);
          const valueIsNaN: boolean = Number.isNaN(numericValue);
          console.log("numericValue:", numericValue, 'valueIsNaN:', valueIsNaN,
            'type of setting:', typeof initialState.deployOptions.defaultWalletId);

          if (valueIsNaN && (typeof initialState.deployOptions[settingKey] === 'number')) {
            state.deployOptions[settingKey] = null;
          }else if (valueIsNaN && (typeof initialState.deployOptions[settingKey] === 'string')){
            state.deployOptions[settingKey] = value;
          } else if (typeof initialState.deployOptions[settingKey] === 'number'){
            state.deployOptions[settingKey] = value;
          } else {
            console.error(
              'Invalid deployment setting value:', value, '\nfor key:', settingKey
            );
          }
        }else if (typeof value === 'number') {
          if (Number.isNaN(value)){
            state.deployOptions[settingKey] = null;
          }else{
            state.deployOptions[settingKey] = value;
          }
        } else if (value === null && typeof initialState.deployOptions[settingKey] === 'number'){
          state.deployOptions[settingKey] = null;
        }else{
          console.error(
            'Invalid deployment setting value type must be string, number, or null. got type:',  typeof value
          );
        }
      }else if (settingKey === 'MirrorUrlOverride' && value === ''){
        // special case for mirror url override
        state.deployOptions.mirrorUrlOverride = null;
      }else{
        console.error(
          'Invalid deployment setting key:', settingKey
        );
      }
    },

    setWalletHost: (state, { payload }) => {
      if (typeof payload === 'string' && payload) {
        console.log('setting wallethost:', payload);
        state.deployOptions.walletHost = payload;
        console.log('wallethost now:', state.deployOptions.walletHost);
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
  setStoreLabel,
  setAccessKey,
  setAccessSecret,
  setFallbackStoreProvider,
  setDeploymentSetting,
} = userOptionsSlice.actions;

export default userOptionsSlice.reducer;
