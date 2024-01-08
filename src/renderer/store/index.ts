import { configureStore } from '@reduxjs/toolkit';
import { ipcApi } from '../api';
import appReducer from './slices/app/app.slice';
import userOptionsReducer from './slices/userOptions/userOptions.slice';
import storage from 'redux-persist/lib/storage';
// @ts-ignore
import { rtkQueryErrorLogger } from './middleware/rtkQueryErrorLogger';

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  REGISTER,
  persistStore,
} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistUserOptionsConfig = {
  key: 'userOptions',
  version: 1,
  storage,
  stateReconciler: autoMergeLevel2,
};

const store = configureStore({
  reducer: {
    app: appReducer,
    // @ts-ignore
    userOptions: persistReducer(persistUserOptionsConfig, userOptionsReducer),
    [ipcApi.reducerPath]: ipcApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, REGISTER],
      },
    })
      .concat(ipcApi.middleware)
      .concat(rtkQueryErrorLogger),
});

const persistor = persistStore(store);

// @ts-ignore
window.store = store;

export { store, persistor };
