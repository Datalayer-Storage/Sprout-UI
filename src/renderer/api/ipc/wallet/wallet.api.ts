import { ipcApi } from "..";

/**
 * importing the chia-wallet module and its typescript types
 */
import {
  Config as WalletConfig,
  GetPrivateKeyResponse,
  SpendableCoinRequest,
  CoinRecordsByNameRequest,
  PushTxRequest,
  // @ts-ignore
} from 'chia-wallet';

/**
 * RTKquery state managment API for chia-wallet
 */
const walletApi = ipcApi.injectEndpoints({
  endpoints: (builder) => ({
    
    getConfig: builder.query<WalletConfig, any>({
      query: () => ({ channel: 'walletGetConfig', args: {} }),
      // @ts-ignore
      providesTags: () => ['walletConfig'],
    }),

    setConfig: builder.mutation<WalletConfig, any>({
      query: () => ({ channel: 'walletSetConfig', args: {} }),
      // @ts-ignore
      invalidatesTags: () => ['walletConfig'],
    }),

    getLoggedInFingerprint: builder.query<any ,any>({
      query: () => ({ channel: 'walletGetLoggedInFingerprint', args: {}})
    }),

    getCoinRecords: builder.query<any ,any>({
      query: () => ({ channel: 'walletGetCoinRecords', args: {} })
    }),

    getPrivateKey: builder.query<GetPrivateKeyResponse, any>({
      query: () => ({ channel: 'getPrivateKey', args: {} })
    }),

    getCoinRecordsByName: builder.query<CoinRecordsByNameRequest, any>({
      query: () => ({ channel: 'walletGetCoinRecordsByName', args: {} })
    }),
    
    getSpendableCoins: builder.query<SpendableCoinRequest, any>({
      query: () => ({ channel: 'walletGetSpendableCoins', args: {} })
    }),

    pushTxRequest: builder.mutation<PushTxRequest, any>({
      query: () => ({ channel: 'walletPushTx', args: {} }),
    })
  }),
});

export const { useGetConfigQuery } = walletApi;
