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
    }
  },
});

export const { toggleTheme, setAccessKey, setAccessSecret, setFallbackStoreProvider } =
  userOptionsSlice.actions;

export default userOptionsSlice.reducer;
