import { useEffect, useState } from 'react';
import useTokenHooks from '../hooks/token-hooks';
import { formatAmount } from '../utilities/formater';
import { images } from '../utilities/images';
import { ethers } from 'ethers';
import { collateralAddresses } from '../constants/contracts-abi';

const TopNavLayout = () => {
  const { fetchaUSDTotalSupply, fetchAllCollateralinfo } = useTokenHooks();
  const [aUSDInfo, setaUSDInfo] = useState({
    totalSupply: '0',
    totalTVL: '0',
    collateralRatio: '0'
  })
  
  const handleInit = async () => {
    const totalSupply = await fetchaUSDTotalSupply() as number;
    const formattedTotalSupply = Number(ethers.formatUnits(totalSupply));
    const totalCollateral = await fetchAllCollateralinfo(collateralAddresses) as number
    const formattedTotalCollateral= Number(ethers.formatUnits(totalCollateral))
    const collateralRatio = (formattedTotalCollateral / formattedTotalSupply)
    // const result = await fetchNavInfo();
    // console.log(result, "reseultss");
    

    setaUSDInfo({
      ...aUSDInfo,
      totalSupply: formattedTotalSupply.toFixed(2),
      totalTVL: formattedTotalCollateral.toFixed(2),
      collateralRatio: collateralRatio.toFixed(2)
    })
  };
  useEffect(() => {
    handleInit()
  },[])

  return (
    <div className="px-20  flex items-center h-[46px] justify-between border-b border-light-400">
      <div className="flex items-center gap-x-8 justify-between">
        <p className="text-[11px]/[14px] font-montserrat text-white ">
          TVL:
          <span className="ml-2 text-primary-100">${formatAmount(aUSDInfo.totalTVL ?? '0')}</span>
        </p>
        <div className="flex items-center">
          <img src={images.gainIcon} alt="gain-icon" className="mr-1 w-[12px]" />
          <span className="text-[11px]/[14px] font-montserrat text-white ">
            0.34%
          </span>
        </div>
        <p className="text-[11px]/[14px] font-montserrat text-white ">
          aUSD Total Mint:
          <span className="ml-2 text-primary-100">
          ${formatAmount(aUSDInfo.totalSupply ?? '0')}
          </span>
        </p>
        <div className="flex items-center">
          <img src={images.lossIcon} alt="gain-icon" className="mr-1 w-[12px]" />
          <span className="text-[11px]/[14px] font-montserrat text-white ">
            2.95%
          </span>
        </div>
        <p className="text-[11px]/[14px] font-montserrat text-white ">
          aUSD:
          <span className="ml-2 text-primary-100">0.99746</span>
        </p>
      </div>
      <div className="bg-[#FB72001A] px-[15px]  rounded-[5px]">
        <span className="text-white text-[11px] font-outfit">
          Collateral Ratio: {aUSDInfo.collateralRatio}
        </span>
      </div>
    </div>
  );
};

export default TopNavLayout;
