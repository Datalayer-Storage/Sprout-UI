import { createSlice } from '@reduxjs/toolkit';
import initialState from './app.initialstate';
import _ from 'lodash';

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLocale: (state, { payload }) => {
      state.locale = payload;
    },

    invalidateCheckForTXToken: (state) => {
      state.checkForPendingTxToken = Math.random();
      setTimeout(() => {
        state.checkForPendingTxToken = Math.random();
      }, 1000);
    },

    updateStoreMirror : (state, { payload }) => {
      if (!_.isNil(payload.storeId) && !_.isNil(payload.url)) {
        state.storeMirrors[payload.storeId] =  payload.url;
      }
      //state.storeMirrors = {};
    }
  },
});

export const {
  setLocale,
  invalidateCheckForTXToken,
  updateStoreMirror
} = appSlice.actions;

export default appSlice.reducer;
