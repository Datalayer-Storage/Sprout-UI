import { ipcApi } from "@/api";

/**
 * importing the chia-wallet module and its typescript types
 */
import {
  Config as WalletConfig,
  GetPrivateKeyRequest,
  SpendableCoinRequest,
  CoinRecordsByNameRequest,
  PushTxRequest,
  // @ts-ignore
} from 'chia-wallet';

const configTag: string = "walletConfig";

/**
 * RTKquery state managment API for chia-wallet
 */
const walletApi = ipcApi.injectEndpoints({
  endpoints: (builder) => ({
    getConfig: builder.query<WalletConfig, any>({
      query: () => ({ channel: 'walletGetConfig', args: {} }),
      // @ts-ignore
      providesTags: () => [configTag],
    }),

    setConfig: builder.mutation<WalletConfig, any>({
      query: () => ({ channel: 'walletSetConfig', args: {} }),
      // @ts-ignore
      invalidatesTags: () => [configTag],
    }),

    getLoggedInFingerprint: builder.query<any, any>({
      query: () => ({ channel: 'walletGetLoggedInFingerprint', args: {} }),
    }),

    getCoinRecords: builder.query<any, any>({
      query: () => ({ channel: 'walletGetCoinRecords', args: {} }),
    }),

    getPrivateKey: builder.query<GetPrivateKeyRequest, any>({
      query: () => ({ channel: 'getPrivateKey', args: {} }),
    }),

    getCoinRecordsByName: builder.query<CoinRecordsByNameRequest, any>({
      query: () => ({ channel: 'walletGetCoinRecordsByName', args: {} }),
    }),

    getSpendableCoins: builder.query<SpendableCoinRequest, any>({
      query: () => ({ channel: 'walletGetSpendableCoins', args: {} }),
    }),

    pushTxRequest: builder.mutation<PushTxRequest, any>({
      query: () => ({ channel: 'walletPushTx', args: {} }),
    }),

    getWalletSyncStatus: builder.query<any, any>({
      query: () => ({ channel: 'walletGetSyncStatus', args: {} }),
    }),

    getSyncStatusImmediate: builder.mutation<any, any>({
      query: () => ({ channel: 'walletGetSyncStatus', args: {} }),
    }),

    getWalletBalance: builder.mutation<any, any>({
      query: () => ({ channel: 'walletGetWalletBalance', args: {} }),
    }),

    getTransactions: builder.query<any, any>({
      query: () => ({ channel: 'walletGetTransactions', args: {} }),
    }),
  }),
});

export const {
  useGetConfigQuery,
  useGetWalletSyncStatusQuery,
  useGetWalletBalanceMutation,
  useGetSyncStatusImmediateMutation,
  useGetTransactionsQuery,
} = walletApi;
