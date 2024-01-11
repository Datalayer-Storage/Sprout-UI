import { createSlice } from '@reduxjs/toolkit';
import initialState from './browser.initialstate';

export const browserSlice = createSlice({
  name: 'browser',
  initialState,
  reducers: {
    /*
    setLocale: (state, { payload }) => {
      state.locale = payload;
    },
    */

    visitPage: () => {

    },
    goBack: () => {

    }
  },
});

/*export const {

} = browserSlice.actions;*/

export default browserSlice.reducer;
