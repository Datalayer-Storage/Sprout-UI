import { createSlice } from '@reduxjs/toolkit';
import initialState from './myDatalayerStore.initialstate';

export const myDatalayerStoreSlice = createSlice({
  name: 'userOptions',
  initialState,
  reducers: {

    toggleFilesDeployed: (state) => {
      state.filesDeployed = !state.filesDeployed;
    },

    setSelectedStoreId: (state, { payload }) => {
      if ((typeof payload === 'string') && payload){
        state.selectedStoreId = payload;
      }else{
        console.error("invalid store id. store id must be a string and must not be null");
      }
    }
  },
});

export const {
  toggleFilesDeployed,setSelectedStoreId
} = myDatalayerStoreSlice.actions;

export default myDatalayerStoreSlice.reducer;