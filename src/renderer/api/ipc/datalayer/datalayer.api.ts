import { ipcApi } from "..";

const datalayerApi = ipcApi.injectEndpoints({
  endpoints: (builder) => ({
    getConfig: builder.query<any, any>({
      query: () => ({ channel: "walletGetConfig", args: {} }),
      // @ts-ignore
      providesTags: () => ["datalayerConfig"],
    }),
  }),
});

export const { useGetConfigQuery } = datalayerApi;
