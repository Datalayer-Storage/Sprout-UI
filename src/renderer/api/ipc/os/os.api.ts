import { ipcApi } from "@/api";

const osApi = ipcApi.injectEndpoints({
  endpoints: (builder) => ({

    openFolderSelection: builder.mutation<any, any>({
      query: () => ({ channel: 'selectFolderDialogue', args: {} }),
    }),
  }),
});

export const {
  useOpenFolderSelectionMutation
} = osApi;
