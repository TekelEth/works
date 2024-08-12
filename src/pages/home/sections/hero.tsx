import Button from '../../../components/ui/button';
import { images } from '../../../utilities/images';
import CardLayout from '../../../components/ui/card/price-tag';
import { readContract } from '@wagmi/core';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import aUSDAbi from '../../../constants/contracts-abi/aUSD.json';
import interractionAbi from '../../../constants/contracts-abi/interaction.json';
import {
  collateralAddresses,
  contractAddress,
  HexString,
} from '../../../constants/contracts-abi';
import { formatAmount } from '../../../utilities/formater';

const Hero = () => {
  useEffect(() => {
    handleInit();
  }, []);

  const [data, setData] = useState<{ [k: string]: string | number }>({});

  // fetch individual collterral
  const fetchCollateral = async (address: HexString) => {
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
    const results = await Promise.all(addresses.map(fetchCollateral));
    return results.reduce(
      (accumulator: any, currentValue: any) => accumulator + currentValue
    );
  };

  const handleInit = async () => {
    const data: any = {};
    // fetches total supply
    await readContract({
      abi: aUSDAbi,
      address: contractAddress.ausd,
      functionName: 'totalSupply',
      args: [],
    }).then((res: any) => {
      data['totalSupply'] = ethers.formatUnits(res);
    });

    // Fetches total Collateral amount
    const totalCollateral: any =
      await fetchAllCollateralinfo(collateralAddresses);
    data['totalCollateral'] = ethers.formatUnits(totalCollateral);
    data['availableMint'] = data['totalCollateral'] - data['totalSupply'];
    if (data) {
      setData(data);
    }
  };

  return (
    <div>
      <div className="flex px-16 items-center relative h-[calc(100vh-96px)] ">
        <div className="lg:w-[556px] -mt-32 flex flex-col">
          <h1 className="text-[54px]/[60px] font-montserrat text-white font-bold">
            Providing the Best On-Chain Utility for the US Dollar
          </h1>
          <span className="text-[20px]/[29px] font-montserrat pl-3 pt-4 text-light-100">
            TurboAnchor provides the best on-chain liquidity for stablecoins
            through diversified liquid staking solutions.
          </span>
          <div className="mt-8 flex items-center gap-x-[25px]">
            <Button
              className="font-nunito rounded-[35px] h-[67px]"
              variant={'primary'}
            >
              Launch dApp
            </Button>
            <Button
              className="font-nunito rounded-[35px] h-[67px]"
              variant={'outline'}
            >
              View Whitepaper
            </Button>
          </div>
        </div>
        <div className="z-50 -mt-10 absolute right-4">
          <img
            src={images.backdrop}
            alt="backdrop"
            className="h-[710px] w-[800px]"
          />
        </div>
      </div>
      <div className="max-w-[1000px] mx-auto flex justify-between pt-[60px] pb-[120px] items-center gap-x-6">
        <CardLayout variant={'active'} className="rounded-[10px]">
          <span className="text-white font-[16px] font-montserrat mb-4">
            Total Mint
          </span>
          <h2 className="font-montserrat font-semibold text-[24px] text-white">
            ${formatAmount(Math.floor(parseInt(data.totalSupply as string)))}
          </h2>
        </CardLayout>
        <CardLayout variant={'outline'} className="rounded-[10px]">
          <span className="text-gray-100 font-[16px] font-montserrat mb-4">
            Available to Mint
          </span>
          <h2 className="font-montserrat font-semibold text-[24px] text-white">
            ${formatAmount(Math.floor(parseInt(data.availableMint as string)))}
          </h2>
        </CardLayout>
        <CardLayout variant={'outline'} className="rounded-[10px]">
          <span className="text-gray-100 font-[16px] font-montserrat mb-4">
            Total Collateral Amount
          </span>
          <h2 className="font-montserrat font-semibold text-[24px] text-white">
            ${formatAmount(Math.floor(parseInt(data.totalCollateral as string)))}
          </h2>
        </CardLayout>
      </div>
    </div>
  );
};

export default Hero;
