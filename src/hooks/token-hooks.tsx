import { contractAddress, HexString, ILK } from '../constants/contracts-abi';
import { readContract } from '@wagmi/core';
import tokenAbi from '../constants/contracts-abi/aUSD.json';
import interractionAbi from '../constants/contracts-abi/interaction.json';
import spotAbi from '../constants/contracts-abi/spot.json';

const useTokenHooks = () => {
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

      const fetchTokenILK = async (address: HexString) => {
        return new Promise((resolve) => {
          resolve(
            readContract({
              abi: interractionAbi,
              address: contractAddress.interaction,
              functionName: 'collaterals',
              args: [address],
            })
          );
        });
      };

      const fetchTokenPrice = (address: HexString) => {
        return new Promise ((resolve) => {
          resolve(
            readContract({
              abi: interractionAbi,
              address: contractAddress.interaction,
              functionName: 'collateralPrice',
              args: [address]
            })
          )
        })
      }

      
  const fetchCollateral = async (address: HexString) => {
    return new Promise((resolve) => {
      resolve(
        readContract({
          abi: interractionAbi,
          address: contractAddress.interaction,
          functionName: 'deposits',
          args: [address],
        })
      );
    });
  };

    
      const fetchMCR = async (address: HexString) => {
        const tokenILK = (await fetchTokenILK(address)) as ILK[];
        return new Promise((resolve) => {
          resolve(
            readContract({
              abi: spotAbi,
              address: contractAddress.spot,
              functionName: 'ilks',
              args: [tokenILK[1]],
            })
          );
        });
      };

      const fetchDepositTVL = async (address: HexString) => {
        return new Promise((resolve) => {
          resolve(
            readContract({
              abi: interractionAbi,
              address: contractAddress.interaction,
              functionName: 'depositTVL',
              args: [address],
            })
          );
        });
      };
    
      const fetchBorrowAPR = (address: HexString) => {
        return new Promise((resolve) => {
          resolve(
            readContract({
              abi: interractionAbi,
              address: contractAddress.interaction,
              functionName: 'borrowApr',
              args: [address],
            })
          );
        });
      };
    
    
    
    return {fetchTokenBalance,  fetchBorrowAPR, fetchDepositTVL, fetchCollateral, getAllowanceinfo, fetchMCR, fetchTokenPrice }
}

export default useTokenHooks