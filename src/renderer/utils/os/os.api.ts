import { SelectFolderDialogResponse } from '@/vite-env';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

export function selectFolderDialogue(): Promise<SelectFolderDialogResponse> {
  return ipcRenderer.invoke('selectFolderDialog');
}

export function deployStore(storeId, deployDir, deployMode = 'replace', options = {}) {
  return ipcRenderer.invoke(
    'deployStore',
    storeId,
    deployDir,
    deployMode,
    options,
  );
}
