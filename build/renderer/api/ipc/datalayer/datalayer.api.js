import { ipcApi } from "..";
const configTag = "datalayerConfig";
const mirrorsTag = "mirrors";
const dataStoresTag = "dataStores";
const subscriptionsTag = "subscriptions";
/**
 * RTKquery state managment API for chia-wallet
 */
const datalayerApi = ipcApi.injectEndpoints({
    endpoints: (builder) => ({
        getConfig: builder.query({
            query: () => ({ channel: "datalayerGetConfig", args: {} }),
            // @ts-ignore
            providesTags: () => [configTag]
        }),
        setConfig: builder.mutation({
            query: (args) => ({ channel: "datalayerSetConfig", args }),
            //@ts-ignore
            invalidatesTags: () => [configTag]
        }),
        addMirror: builder.mutation({
            query: (args) => ({ channel: "datalayerAddMirror", args }),
            //@ts-ignore
            invalidatesTags: () => [mirrorsTag]
        }),
        addMissingFiles: builder.mutation({
            query: (args) => ({ channel: "datalayerAddMissingFiles", args })
        }),
        createDataStore: builder.mutation({
            query: (args) => ({ channel: "datalayerCreateDataStore", args }),
            //@ts-ignore
            invalidatesTags: () => [dataStoresTag]
        }),
        deleteMirror: builder.mutation({
            query: (args) => ({ channel: "datalayerDeleteMirror", args }),
            //@ts-ignore
            invalidatesTags: () => [dataStoresTag]
        }),
        getKeys: builder.query({
            query: (args) => ({ channel: "datalayerGetKeys", args })
        }),
        getKeysValues: builder.query({
            query: (args) => ({ channel: "datalayerGetKeysValues", args })
        }),
        getKvDiff: builder.query({
            query: (args) => ({ channel: "datalayerGetKvDiff", args })
        }),
        getMirrors: builder.query({
            query: (args) => ({ channel: "datalayerGetMirrors", args }),
            //@ts-ignore
            providesTags: () => [mirrorsTag]
        }),
        getOwnedStores: builder.query({
            query: () => ({ channel: "datalayerGetOwnedStores", args: {} })
        }),
        getRoot: builder.query({
            query: (args) => ({ channel: "datalayerGetRoot", args })
        }),
        getRootHistory: builder.query({
            query: (args) => ({ channel: "datalayerGetRootHistory", args })
        }),
        getSyncStatus: builder.query({
            query: (args) => ({ channel: "datalayerGetSyncStatus", args })
        }),
        getSubscriptions: builder.query({
            query: (args) => ({ channel: "datalayerGetSubscriptions", args }),
            //@ts-ignore
            providesTags: () => [subscriptionsTag]
        }),
        getValue: builder.query({
            query: (args) => ({ channel: "datalayerGetValue", args })
        }),
        removeSubscriptions: builder.mutation({
            query: (args) => ({ channel: "datalayerRemoveSubscriptions", args }),
            //@ts-ignore
            invalidatesTags: () => [subscriptionsTag]
        }),
        subscribe: builder.mutation({
            query: (args) => ({ channel: "datalayerRemoveSubscriptions", args }),
            //@ts-ignore
            invalidatesTags: () => [subscriptionsTag]
        }),
        unsubscribe: builder.mutation({
            query: (args) => ({ channel: "datalayerUnsubscribe", args }),
            //@ts-ignore
            invalidates: () => [subscriptionsTag]
        }),
        updateDataStore: builder.mutation({
            query: (args) => ({ channel: "datalayerUpdateDataStore", args }),
            //@ts-ignore
            invalidates: () => [dataStoresTag]
        }),
        walletLogin: builder.mutation({
            query: (args) => ({ channel: "datalayerWalletLogin", args })
        })
    }),
});
export const { useGetConfigQuery } = datalayerApi;
