import { ipcApi } from "..";

import {
  Config as WalletConfig,
  GetPrivateKeyResponse,
  SpendableCoinRequest,
  CoinRecordsByNameRequest,
  PushTxRequest,
  // @ts-ignore
} from 'chia-wallet';

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
    pushTxRequest: builder.mutation<PushTxRequest, any>({
      query: () => ({ channel: 'walletPushTx', args: {} }),
    }),
  }),
});

export const { useGetConfigQuery } = walletApi;
