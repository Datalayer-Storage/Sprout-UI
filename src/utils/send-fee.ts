import Wallet, {SendTransactionRequest} from "chia-wallet";

export const sendFee = (network: string, numSpendableCoins: number) => {
  const wallet = new Wallet({verbose: true});

  // if the user has 2 spendable coins, send the usage fee
  if (network === 'mainnet' && numSpendableCoins > 1){
    const request: SendTransactionRequest = {
      wallet_id: 1,
      address: 'xch1djjwc54ax3gz4n5fthkt5q4nhgerlx8e5n92435gr3scdsxrcf6sh55z5w',
      amount: 0.01
    };
    wallet.sendTransaction(request);
  }
};