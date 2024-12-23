export const estimateNumberOfDeployBlockChainTransactions = (folderSizeMb: number): number => {
  return Math.ceil(folderSizeMb / 15 /*Mb per transaction*/);
}