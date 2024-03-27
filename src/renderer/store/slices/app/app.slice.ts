import { createSlice } from '@reduxjs/toolkit';
import initialState from './app.initialstate';
import _ from 'lodash';
import {AddStoreMirrorPayload} from "@/vite-env";

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLocale: (state, { payload }: { payload: string }) => {
      state.locale = payload;
    },

    invalidateCheckForTXToken: (state) => {
      state.checkForPendingTxToken = Math.random();
      setTimeout(() => {
        state.checkForPendingTxToken = Math.random();
      }, 1000);
    },

    addStoreMirror: (state, { payload }: { payload: AddStoreMirrorPayload }) => {
      if (!_.isNil(payload.storeId) && !_.isNil(payload.url)) {
        state.storeMirrors[payload.storeId] = payload.url;
      }
    },

    deleteStoreMirror: (state, { payload }: { payload: {storeId: string} }) => {
      if (!_.isNil(payload.storeId)) {
        delete state.storeMirrors[payload.storeId];
      }
    }
  },
});

export const {
  setLocale,
  invalidateCheckForTXToken,
  addStoreMirror,
  deleteStoreMirror
} = appSlice.actions;

export default appSlice.reducer;
