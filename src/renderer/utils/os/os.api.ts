import {SelectFolderDialogResponse} from "@/vite-env";

const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

export async function selectFolderDialogue(): Promise<SelectFolderDialogResponse> {
  return await ipcRenderer.invoke('selectFolderDialog');
}
