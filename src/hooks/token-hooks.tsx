import { contractAddress, HexString, ILK } from '../constants/contracts-abi';
import { prepareWriteContract, readContract, writeContract } from '@wagmi/core';
import tokenAbi from '../constants/contracts-abi/aUSD.json';
import interractionAbi from '../constants/contracts-abi/interaction.json';
import spotAbi from '../constants/contracts-abi/spot.json';
import aUSDAbi from '../constants/contracts-abi/aUSD.json';
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';
import axios from 'axios';

const useTokenHooks = () => {
  const {address: userAddress} = useAccount()
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


  
  const fetchaUSDTotalSupply = () => {
    return new Promise((resolve) => {
      resolve(
        readContract({
          abi: aUSDAbi,
          address: contractAddress.ausd,
          functionName: 'totalSupply',
          args: [],
        })
      )
    })
  }

  const lockedBorrow = async (address: HexString, userAddress: HexString) => {
    return new Promise((resolve) => {
      resolve(
        readContract({
          address: contractAddress.interaction,
          abi: interractionAbi,
          functionName: 'locked',
          args: [address, userAddress]
        })
      );
    });
  };

  const currentLiquidationPrice = async (address: HexString, userAddress: HexString) => {
    return new Promise((resolve) => {
      resolve(
        readContract({
          address: contractAddress.interaction,
          abi: interractionAbi,
          functionName: 'currentLiquidationPrice',
          args: [address, userAddress]
        })
      );
    });
  };



  const approveFunction = async (address: HexString, amount: number) => {
    const { request } = await prepareWriteContract({
      address: address,
      abi: tokenAbi,
      functionName: 'approve',
      args: [contractAddress.interaction, ethers.parseUnits(amount.toString())],
    });

    return await writeContract(request);
  };
  const getAllowanceinfo = (collateralAddress: HexString, userAddress: any) => {
    return new Promise((resolve) => {
      resolve(
        readContract({
          abi: tokenAbi,
          address: collateralAddress,
          functionName: 'allowance',
          args: [userAddress, contractAddress.interaction],
        })
      );
    });
  };

  const fetchCollateralBalance = async (
    address: HexString,
  ) => {
    return new Promise((resolve) => {
      resolve(
        readContract({
          abi: interractionAbi,
          address: contractAddress.interaction,
          functionName: 'locked',
          args: [address, userAddress],
        })
      );
    });
  };

  const fetchUserBorrowedBalance = async (
    address: HexString,
  ) => {
    return new Promise((resolve) => {
      resolve(
        readContract({
          abi: interractionAbi,
          address: contractAddress.interaction,
          functionName: 'borrowed',
          args: [address, userAddress],
        })
      );
    });
  };

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
    return new Promise((resolve) => {
      resolve(
        readContract({
          abi: interractionAbi,
          address: contractAddress.interaction,
          functionName: 'collateralPrice',
          args: [address],
        })
      )
    });
  };

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

  const fetchAllCollateralinfo = async (addresses: HexString[]) => {
    const results = await Promise.all(addresses.map(fetchDepositTVL));
    return results.reduce(
      (accumulator: any, currentValue: any) => accumulator + currentValue
    );
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

  const availableToBorrow = (address: HexString, userAddress: HexString) => {
    return new Promise((resolve) => {
      resolve(
        readContract({
          abi: interractionAbi,
          address: contractAddress.interaction,
          functionName: 'availableToBorrow',
          args: [address, userAddress],
        })
      );
    });
  };

  const fetchNavInfo = async () => {
    const {data} = await axios.get('http://3.80.55.144:21101/stable/snapshot/last');
    return data;
  }

  return {
    lockedBorrow,
    fetchNavInfo,
    fetchTokenBalance,
    availableToBorrow,
    approveFunction,
    fetchUserBorrowedBalance,
    fetchBorrowAPR,
    fetchDepositTVL,
    fetchAllCollateralinfo,
    fetchCollateral,
    getAllowanceinfo,
    fetchMCR,
    fetchaUSDTotalSupply,
    fetchTokenPrice,
    currentLiquidationPrice,
    fetchCollateralBalance,
  };
};

export default useTokenHooks;
