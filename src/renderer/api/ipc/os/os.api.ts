import {ipcRenderer} from 'electron';

export async function selectFolderDialogue() {
  const result = await ipcRenderer.invoke('selectFolderDialog');
  console.log('result of file dialogue:', result);
}
