import Wallet, {SendTransactionRequest} from "chia-wallet";

const mojosPerXch = 1e12;
export const fixedFeeXch = 0.01;
const feePer100MbXch = 0.01;
const walletAddress: string = 'xch1uhl59yg7mqdvmqm5lvf4pld50wakrk75z8g9cdsd8gvrd2klyzesjjju5k';

export const sendFixedFee = (network: string, numSpendableCoins: number) => {
  const wallet = new Wallet({verbose: true});

  // if the user has 2 spendable coins, send the usage fee
  if (network === 'mainnet' && numSpendableCoins >= 2){
    const request: SendTransactionRequest = {
      wallet_id: 1,
      address: walletAddress,
      amount: xchToMojos(fixedFeeXch)
    };
    return wallet.sendTransaction(request);
  }
};

export const sendVariableFee = (network: string, numSpendableCoins: number, fee: number) => {
  const wallet = new Wallet({verbose: true});

  // if the user has 2 spendable coins, send the usage fee
  if (network === 'mainnet' && numSpendableCoins >= 2){
    const request: SendTransactionRequest = {
      wallet_id: 1,
      address: walletAddress,
      amount: xchToMojos(fee)
    };
    wallet.sendTransaction(request);
  }
};

export const calcSizeBasedDeployFee = (sizeMb: number): number => {
  const fee: number = parseFloat( ( (sizeMb / 100) * feePer100MbXch ).toFixed(5) );

  if (fee < fixedFeeXch){ // check: fee is less than a mojo
    return fixedFeeXch;
  } else {
    return fee;
  }
}

export const xchToMojos = (xch: number):number => {
  return Math.ceil(xch * mojosPerXch);
}