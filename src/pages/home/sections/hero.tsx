import Button from '../../../components/ui/button';
import { images } from '../../../utilities/images';
import CardLayout from '../../../components/ui/card/price-tag';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import {
  collateralAddresses,
} from '../../../constants/contracts-abi';
import { formatAmount } from '../../../utilities/formater';
import { Link } from 'react-router-dom';
import useTokenHooks from '../../../hooks/token-hooks';

const Hero = () => {
  useEffect(() => {
    handleInit();
  }, []);

  const [data, setData] = useState<{ [k: string]: string | number }>({});
  const { fetchAllCollateralinfo, fetchaUSDTotalSupply } = useTokenHooks()

  const handleInit = async () => {
    const data: any = {};
    const totalSupply = ethers.formatUnits(await fetchaUSDTotalSupply() as number);
    const totalCollateral: any =
      ethers.formatUnits(await fetchAllCollateralinfo(collateralAddresses) as number);
    data['totalSupply'] = totalSupply;
    data['totalCollateral'] = totalCollateral;
    data['collateralRatio'] = data['totalCollateral'] / data['totalSupply'];
    if (data) {
      setData(data);
    }
  };

  return (
    <div>
      <div className="flex px-16 items-center relative h-[calc(100vh-96px)] ">
        <div className="lg:w-[556px]  border-[#E3E3E3s]  -mt-32 flex flex-col">
          <h1 
              data-aos="fade-up-right" 
              className="text-[54px]/[60px] font-montserrat text-white font-bold">
            Providing the Best On-Chain Utility for the US Dollar
          </h1>
          <span
              data-aos="fade-left"  
              className="text-[20px]/[29px] font-montserrat pl-3 pt-4 text-light-100">
            TurboAnchor provides the best on-chain liquidity for stablecoins
            through diversified liquid staking solutions.
          </span>
          <div className="mt-8 flex items-center gap-x-[25px]">
            <Link to={'/dashboard/market'}>
              <Button
                data-aos="zoom-in"
                className="font-nunito rounded-[35px] h-[67px]"
                variant={'primary'}
              >
                Launch dApp
              </Button>
            </Link>
            <Link to={'#'}>
              <Button
                data-aos="zoom-in"
                className="font-nunito rounded-[35px] h-[67px]"
                variant={'outline'}
              >
                View Whitepaper
              </Button>
            </Link>
          </div>
        </div>
        <div data-aos="zoom-in-left" className="z-50 -mt-10 absolute right-4">
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
            ${formatAmount(Number(data.totalSupply ?? 0).toFixed(2))}
          </h2>
        </CardLayout>
        <CardLayout variant={'outline'} className="rounded-[10px]">
          <span className="text-gray-100 font-[16px] font-montserrat mb-4">
            Collateral Ratio
          </span>
          <h2 className="font-montserrat font-semibold text-[24px] text-white">
            {formatAmount(Number(data.collateralRatio ?? 0).toFixed(2)) }
          </h2>
        </CardLayout>
        <CardLayout variant={'outline'} className="rounded-[10px]">
          <span className="text-gray-100 font-[16px] font-montserrat mb-4">
            Total Collateral Amount
          </span>
          <h2 className="font-montserrat font-semibold text-[24px] text-white">
            $
            {formatAmount(Number(data.totalCollateral ?? 0).toFixed(2))}
          </h2>
        </CardLayout>
      </div>
    </div>
  );
};

export default Hero;
