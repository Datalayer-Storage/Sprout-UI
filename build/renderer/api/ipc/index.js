import { createApi } from '@reduxjs/toolkit/query/react';
// @ts-ignore
const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;
/**
 * Custom base query to use Electron's IPC renderer
 * @param {string} channel - IPC channel to send the request to
 * @param {any} args - Arguments for the IPC call
 * @returns {Promise<any>} - Promise representing the IPC call result
 */
const ipcRendererBaseQuery = async ({ channel, args }) => {
    try {
        const result = await ipcRenderer.invoke(channel, args);
        return { data: result };
    }
    catch (error) {
        return {
            error: {
                status: "CUSTOM_ERROR",
                data: error?.message || "An error occurred",
            },
        };
    }
};
export const ipcApi = createApi({
    baseQuery: ipcRendererBaseQuery,
    reducerPath: "ipcApi",
    endpoints: () => ({}),
});
