import { Link } from 'react-router-dom';
import Button from '../../../components/ui/button';
import { images } from '../../../utilities/images';
import { ICurrency, InitialCurrency } from '../../../interface';
import { FC, useEffect, useState } from 'react';
import CurrencyDropdown from '../../../components/ui/currencyDropdown';
import { contractAddress, HexString } from '../../../constants/contracts-abi';
import { readContract } from '@wagmi/core';
import interractionAbi from '../../../constants/contracts-abi/interaction.json';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import { formatAmount } from '../../../utilities/formater';



interface IProp  {}

const Collaterall:FC<IProp> = () => {
  const { address: userAddress } = useAccount();
  const [displayDropDown, setDisplayDropdown] = useState(false);
  const [currency, setCurrency] = useState<ICurrency>(InitialCurrency); 
  const toggle = () => setDisplayDropdown(!displayDropDown);
  const [collateralBalance, setCollateralBalance] = useState('0');

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


  const fetchBalance = async () => {
    const balance = (await fetchCollateralBalance(currency.address)) as number;
    setCollateralBalance(Number(ethers.formatUnits(balance)).toFixed(2))
  }

  useEffect(() => {
    fetchBalance();
  }, [currency, setCurrency]);


  return (
    <div className="col-span-1 row-span-3 px-[30px] py-[20px] border-line">
      <div className="flex items-center ">
        <h1 className="text-[20px] text-bold mr-2">My Collateral</h1>
        <img src={images.sortIcon} alt="img-icon" />
      </div>
      <div className="h-[118px] mt-6 px-6 py-4 flex items-center justify-between border rounded-[15px] border-[#302E2E]">
        <div className="flex items-center">
          <img
            src={currency.icon}
            width={36}
            height={36}
            alt="usdt-img"
            className="mr-2 -mt-6"
          />
          <div className="flex  flex-col">
            <h1 className="text-bold text-[32px]/[40px]">${formatAmount(collateralBalance) ?? 0}</h1>
            <span className="text-[16px]/[19px] text-[#FFFFFF80]  font-montserrat mt-1">
              ${formatAmount(collateralBalance) ?? 0} {currency.name}
            </span>
          </div>
        </div>
        <div onClick={toggle} className="flex relative items-center cursor-pointer h-[46px] rounded-[8px] px-[14px] border bg-[#FFFFFF1A] border-[#FFFFFF0D]">
          <img
            src={currency.icon}
            width={25}
            height={25}
            alt="usdt-img"
            className="mr-2"
          />
          <h1 className="font-montserrat text-[18px]/[30px] text-[#FFFFFFE5]">
            {currency.name}
          </h1>
          <img
                src={images.arrowDown}
                className="w-[11px] cursor-pointer ml-2"
                alt="arrow-down"
          />
            {displayDropDown && (
        <CurrencyDropdown
          className='top-[53px] right-0'
          setDisplayDropdown={setDisplayDropdown}
          setCurrency={setCurrency}
        />
      )}
        </div>
      

      </div>
      <div className="mt-8 px-5 flex items-center justify-between ">
        <Link to={'/dashboard/deposit'}>
          <Button variant={'primary'} className="w-[133px] h-[46px]">
            Deposit
          </Button>
        </Link>
        <Link to={'/dashboard/withdrawal'}>
          <Button variant={'outline'} className="w-[133px] h-[46px]">
            Withdrawal
          </Button>
        </Link>
      </div>

    </div>
  );
};

export default Collaterall;
