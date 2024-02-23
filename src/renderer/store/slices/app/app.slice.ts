import { createSlice } from '@reduxjs/toolkit';
import initialState from './app.initialstate';

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
    }
  },
});

export const {
  setLocale,
  invalidateCheckForTXToken
} = appSlice.actions;

export default appSlice.reducer;
