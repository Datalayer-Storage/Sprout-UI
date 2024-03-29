import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import initialState from './app.initialstate';
import _ from 'lodash';

// Async thunk
export const invalidateCheckForTXTokenAsync =
  createAsyncThunk(
  'app/invalidateCheckForTXToken',
  async (_, { dispatch }) => {
    dispatch(appSlice.actions.setCheckForPendingTxToken(Math.random()));
    return new Promise<void>((resolve, reject) => {
      try {
        setTimeout(() => {
          dispatch(appSlice.actions.setCheckForPendingTxToken(Math.random()));
          resolve();
        }, 1000);
      }catch (error: any){
        reject(error);
      }
    });
  });

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLocale: (state, { payload }) => {
      state.locale = payload;
    },

    /** do not export. private action for {@link invalidateCheckForTXTokenAsync} */
    setCheckForPendingTxToken: (state, { payload }) => {
      state.checkForPendingTxToken = payload;
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
    }
  },
});

export const {
  setLocale,
  addStoreMirror,
  deleteStoreMirror
} = appSlice.actions;

export default appSlice.reducer;
