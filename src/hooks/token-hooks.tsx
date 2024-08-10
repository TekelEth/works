import { contractAddress, HexString } from '../constants/contracts-abi';
import { readContract } from '@wagmi/core';
import tokenAbi from '../constants/contracts-abi/aUSD.json';


const TokenHooks = () => {
    const fetchTokenBalance = async (address: HexString, userAddress: any) => {
        return new Promise((resolve) => {
          resolve(
            readContract({
              abi: tokenAbi,
              address: address,
              functionName: 'balanceOf',
              args: [userAddress],
            })
          );
        });
    };

    const getAllowanceinfo = (collateralAddress: HexString, userAddress: any) => {
        return new Promise((resolve)  => {
          resolve(
            readContract({
              abi: tokenAbi,
              address: collateralAddress,
              functionName: 'allowance',
              args: [userAddress,contractAddress.interaction]
            })
          )
        })
      }
    
    return {fetchTokenBalance, getAllowanceinfo }
}

export default TokenHooks