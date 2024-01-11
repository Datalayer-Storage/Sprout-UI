import { ipcApi } from "@/api";
const configTag = "walletConfig";
/**
 * RTKquery state managment API for chia-wallet
 */
const walletApi = ipcApi.injectEndpoints({
    endpoints: (builder) => ({
        getConfig: builder.query({
            query: () => ({ channel: 'walletGetConfig', args: {} }),
            // @ts-ignore
            providesTags: () => [configTag],
        }),
        setConfig: builder.mutation({
            query: () => ({ channel: 'walletSetConfig', args: {} }),
            // @ts-ignore
            invalidatesTags: () => [configTag],
        }),
        getLoggedInFingerprint: builder.query({
            query: () => ({ channel: 'walletGetLoggedInFingerprint', args: {} })
        }),
        getCoinRecords: builder.query({
            query: () => ({ channel: 'walletGetCoinRecords', args: {} })
        }),
        getPrivateKey: builder.query({
            query: () => ({ channel: 'getPrivateKey', args: {} })
        }),
        getCoinRecordsByName: builder.query({
            query: () => ({ channel: 'walletGetCoinRecordsByName', args: {} })
        }),
        getSpendableCoins: builder.query({
            query: () => ({ channel: 'walletGetSpendableCoins', args: {} })
        }),
        pushTxRequest: builder.mutation({
            query: () => ({ channel: 'walletPushTx', args: {} }),
        })
    }),
});
export const { useGetConfigQuery } = walletApi;
