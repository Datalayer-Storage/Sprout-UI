import fastFolderSizeSync from "fast-folder-size/sync.js";
import fs from "fs";

/**
 * calculates the size of a folder in megabytes. Will return 0 megabytes if the folder is empty.
 * @param folderPath
 * @returns the size of the folder in megabytes
 */
export const calcFolderSize = (folderPath: string): number => {

  const folderItems :string[] = fs.readdirSync(folderPath);
  if (folderItems.length === 0) {
    return 0;
  }

  const selectedFolderSizeBytes: number | undefined = fastFolderSizeSync(folderPath);
  if (!selectedFolderSizeBytes && (selectedFolderSizeBytes !== 0)) {
    throw(new Error('Folder size could not be determined.'));
  }

  return selectedFolderSizeBytes / 1048576; // bytes / 1024 (kb) * 1024 (mb)
}