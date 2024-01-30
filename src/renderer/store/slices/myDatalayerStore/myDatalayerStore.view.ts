export const getFilesDeployed = (state) => {
  return state.myDatalayerStore.filesDeployed;
}

export const getStoreToEdit = (state) => {
  return state.myDatalayerStore.storeIdToEdit;
}

export const getStoreToView = (state) => {
  return state.myDatalayerStore.storeIdToView;
}
