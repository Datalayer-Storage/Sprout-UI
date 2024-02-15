import Wallet, {SendTransactionRequest} from "chia-wallet";

const stdFee = 0.01;
const feePer100Mb = 0.01;

export const sendConstFee = (network: string, numSpendableCoins: number) => {
  const wallet = new Wallet({verbose: true});

  // if the user has 2 spendable coins, send the usage fee
  if (network === 'mainnet' && numSpendableCoins > 1){
    const request: SendTransactionRequest = {
      wallet_id: 1,
      address: 'xch1djjwc54ax3gz4n5fthkt5q4nhgerlx8e5n92435gr3scdsxrcf6sh55z5w',
      amount: stdFee
    };
    wallet.sendTransaction(request);
  }
};

export const sendVariableFee = (network: string, numSpendableCoins: number, fee: number) => {
  const wallet = new Wallet({verbose: true});

  // if the user has 2 spendable coins, send the usage fee
  if (network === 'mainnet' && numSpendableCoins > 1){
    const request: SendTransactionRequest = {
      wallet_id: 1,
      address: 'xch1djjwc54ax3gz4n5fthkt5q4nhgerlx8e5n92435gr3scdsxrcf6sh55z5w',
      amount: fee
    };
    wallet.sendTransaction(request);
  }
};

export const calcSizeBasedDeployFee = (sizeMb: number): number => {
  const fee: number = (sizeMb / 100) * feePer100Mb;

  if (fee < stdFee){ // check: fee is less than a mojo
    return stdFee;
  } else {
    return fee;
  }
}