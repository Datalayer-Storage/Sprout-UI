import { ipcApi } from "..";

/**
 * importing the chia-datalayer module and its typescript types
 */
import {
  Config as DatalayerConfig /* the config type is common to both the chia wallet and chia datalayer */,
  AddMirrorParams,
  AddMissingFilesParams,
  BatchUpdateParams,
  CreateDataStoreParams,
  DeleteMirrorParams,
  GetKeysParams,
  GetKeysValuesParams,
  GetKvDiffParams,
  GetMirrorsParams,
  GetRootParams,
  GetRootHistoryParams,
  GetSyncStatusParams,
  GetValueParams,
  Options,
  RemoveSubscriptionsParams,
  SubscribeParams,
  UnsubscribeParams,
  WalletLogInParams,
  // @ts-ignore
} from 'chia-datalayer';

const datalayerConfigTag: string = "datalayerConfig";
const mirrorsTag: string = "mirrors";
const dataStoresTag: string = "dataStores";
const subscriptionsTag: string = "subscriptions";

/**
 * RTKquery state managment API for chia-wallet
 */
const datalayerApi = ipcApi.injectEndpoints({
  endpoints: (builder) => ({

    getConfig: builder.query<any, any>({
      query: () => ({ channel: "datalayerGetConfig", args: {} }),
      // @ts-ignore
      providesTags: () => [datalayerConfigTag]
    }),

    setConfig: builder.mutation<any, DatalayerConfig>({
      query: (args) => ({ channel: "datalayerSetConfig", args}),
      //@ts-ignore
      invalidatesTags: () => [datalayerConfigTag]
    }),

    addMirror: builder.mutation<any, AddMirrorParams>({
      query: (args) => ({ channel: "datalayerAddMirror", args }),
      //@ts-ignore
      invalidatesTags: () => [mirrorsTag]
    }),

    addMissingFiles: builder.mutation<any, AddMissingFilesParams>({
      query: (args) => ({ channel: "datalayerAddMissingFiles", args })
    }),

    createDataStore: builder.mutation<any, CreateDataStoreParams>({
      query: (args) => ({ channel: "datalayerCreateDataStore", args }),
      //@ts-ignore
      invalidatesTags: () => [dataStoresTag]
    }),

    deleteMirror: builder.mutation<any, DeleteMirrorParams>({
      query: (args) => ({ channel: "datalayerDeleteMirror", args }),
      //@ts-ignore
      invalidatesTags: () => [dataStoresTag]
    }),

    getKeys: builder.query<any, GetKeysParams>({
      query: (args) => ({ channel: "datalayerGetKeys", args })
    }),

    getKeysValues: builder.query<any, GetKeysValuesParams>({
      query: (args) => ({ channel: "datalayerGetKeysValues", args })
    }),

    getKvDiff: builder.query<any, GetKvDiffParams>({
      query: (args) => ({ channel: "datalayerGetKvDiff", args })
    }),

    getMirrors: builder.query<any, GetMirrorsParams>({
      query: (args) => ({ channel: "datalayerGetMirrors", args }),
      //@ts-ignore
      providesTags: () => [mirrorsTag]
    }), 

    getOwnedStores: builder.query<any, any>({
      query: () => ({ channel: "datalayerGetOwnedStores", args: {} })
    }),

    getRoot: builder.query<any, GetRootParams>({
      query: (args) => ({ channel: "datalayerGetRoot", args })
    }),

    getRootHistory: builder.query<any, GetRootHistoryParams>({
      query: (args) => ({ channel: "datalayerGetRootHistory", args })
    }),

    getSyncStatus: builder.query<any, GetSyncStatusParams>({
      query: (args) => ({ channel: "datalayerGetSyncStatus", args })
    }),

    getSubscriptions: builder.query<any, Options>({
      query: (args) => ({ channel: "datalayerGetSubscriptions", args }),
      //@ts-ignore
      providesTags: () => [subscriptionsTag]
    }),

    getValue: builder.query<any, GetValueParams>({
      query: (args) => ({ channel: "datalayerGetValue", args })
    }),

    removeSubscriptions: builder.mutation<any, RemoveSubscriptionsParams>({
      query: (args) => ({ channel: "datalayerRemoveSubscriptions", args }),
      //@ts-ignore
      invalidatesTags: () => [subscriptionsTag]
    }),

    subscribe: builder.mutation<any, SubscribeParams>({
      query: (args) => ({ channel: "datalayerRemoveSubscriptions", args }),
      //@ts-ignore
      invalidatesTags: () => [subscriptionsTag]
    }),

    unsubscribe: builder.mutation<any, UnsubscribeParams>({
      query: (args) => ({ channel: "datalayerUnsubscribe", args }),
      //@ts-ignore
      invalidates: () => [subscriptionsTag]
    }),

    updateDataStore: builder.mutation<any, BatchUpdateParams>({
      query: (args) => ({ channel: "datalayerUpdateDataStore", args }),
      //@ts-ignore
      invalidates: () => [dataStoresTag]
    }), 

    walletLogin : builder.mutation<any, WalletLogInParams>({
      query: (args) => ({ channel: "datalayerWalletLogin", args })
    })
  }),
});

export const { useGetConfigQuery } = datalayerApi;
