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

    addStoreMirror: (state, { payload }) => {
      if (!_.isNil(payload.storeId) && !_.isNil(payload.url)) {
        state.storeMirrors[payload.storeId] =  payload.url;
      }
    },

    deleteStoreMirror: (state, { payload }) => {
      if (!_.isNil(payload.storeId)) {
        delete state.storeMirrors[payload.storeId];
      }
    },

    addUnsubscribingStoreMark: (state, { payload }) => {
      if (!_.isNil(payload.storeId)) {
        console.log('added unsubscribing mark for store', payload.storeId)
        state.unsubscribingStores[payload.storeId] = "in process of unsubscribing";
      }
    },

    deleteUnsubscribingStoreMark: (state, { payload }) => {
      if (!_.isNil(payload.storeId)) {
        console.log('deleted unsubscribing mark for store', payload.storeId)
        delete state.unsubscribingStores[payload.storeId];
      }
    }
  },
});

export const {
  setLocale,
  invalidateCheckForTXToken,
  addStoreMirror,
  deleteStoreMirror,
  addUnsubscribingStoreMark,
  deleteUnsubscribingStoreMark
} = appSlice.actions;

export default appSlice.reducer;
