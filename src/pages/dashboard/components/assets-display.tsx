import { readContract } from "@wagmi/core";
import { collateralAddresses, contractAddress, HexString } from "../../../constants/contracts-abi";
import { useAccount } from "wagmi";
import interractionAbi from '../../../constants/contracts-abi/interaction.json';
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { formatAmount } from "../../../utilities/formater";


const AssetsDisplay = () => {
  const [totalCollateral, setTotalColaterral] = useState('0')
  const  {address: userAddress} = useAccount()                                                                                

  
  const fetchCollateralBalance = async (address: HexString) => {
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
  
  const fetchAllCollateralinfo = async (addresses: HexString[]) => {
    const results = await Promise.all(addresses.map(fetchCollateralBalance));
    const totalCola = await results.reduce(
      (accumulator: any, currentValue: any) => accumulator + currentValue
    ) as string;
    setTotalColaterral(Number(ethers.formatUnits(totalCola)).toFixed(2))
  };


  useEffect(() => {
  
   fetchAllCollateralinfo(collateralAddresses as any)
  })
      

  return (
    <div className="w-full col-span-2 row-span-1  text-[#FFFFFFCC] border-line flex items-center justify-between h-[96px] px-[30px]">
      <div className="flex items-center">
        <p className="font-[500] font-montserrat text-[20px]">
          Total Collateral: <span className="font-bold">${formatAmount(totalCollateral) ?? 0}</span>
        </p>
      </div>
      <div className="flex items-center">
        <p className="font-[500] font-montserrat text-[20px]">
          Total Borrowed: <span className="font-bold">$0 USD</span> 0 aUSD
        </p>
      </div>
      <div className="flex items-center">
        <p className="font-[500] font-montserrat text-[20px]">
          Net Asset Value: <span className="font-bold">$0 USD</span>
        </p>
      </div>
    </div>
  );
};

export default AssetsDisplay;
