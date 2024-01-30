import { createSlice } from '@reduxjs/toolkit';
import initialState from './myDatalayerStore.initialstate';

export const myDatalayerStoreSlice = createSlice({
  name: 'userOptions',
  initialState,
  reducers: {

    toggleFilesDeployed: (state) => {
      state.filesDeployed = !state.filesDeployed;
    },

    setStoreIdToEdit: (state, { payload }) => {
      if ((typeof payload === 'string') && payload){
        state.storeIdToEdit = payload;
      }else{
        console.error("invalid store id. store id must be a string and must not be null");
      }
    },

    setStoreIdToView: (state, { payload }) => {
      if ((typeof payload === 'string') && payload){
        state.storeIdToView = payload;
      }else{
        console.error("invalid store id. store id must be a string and must not be null");
      }
    },
  },
});

export const {
  toggleFilesDeployed,
  setStoreIdToEdit,
  setStoreIdToView
} = myDatalayerStoreSlice.actions;

export default myDatalayerStoreSlice.reducer;