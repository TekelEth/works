import { Link } from 'react-router-dom';
import Button from '../../../components/ui/button';
import { images } from '../../../utilities/images';
import { ICurrency } from '../../../interface';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import CurrencyDropdown from '../../../components/ui/currencyDropdown';
import { ethers } from 'ethers';
import { formatAmount } from '../../../utilities/formater';
import useTokenHooks from '../../../hooks/token-hooks';

interface IProp {
  currency: ICurrency;
  setCurrency: Dispatch<SetStateAction<ICurrency>>;
}

const Collaterall: FC<IProp> = ({ currency, setCurrency }) => {
  const [displayDropDown, setDisplayDropdown] = useState(false);
  const toggle = () => setDisplayDropdown(!displayDropDown);
  const [collateralInfo, setCollateralInfo] = useState({
    price: '0',
    balance: '0',
  });
  const { fetchCollateralBalance, fetchTokenPrice } = useTokenHooks();

  const fetchBalance = async () => {
    const balance = (await fetchCollateralBalance(
      currency.address,
    )) as number;
    const tokenPrice = (await fetchTokenPrice(currency.address)) as number;
    setCollateralInfo({
      ...collateralInfo,
      balance: Number(ethers.formatUnits(balance)).toFixed(2),
      price: Number(ethers.formatUnits(tokenPrice)).toFixed(2),
    });
  };

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
            <h1 className="text-bold text-[32px]/[40px]">
              {formatAmount(collateralInfo.balance) ?? 0}
            </h1>
            <span className="text-[16px]/[19px] text-[#FFFFFF80]  font-montserrat mt-1">
              $
              {formatAmount(
                Number(collateralInfo.balance) * Number(collateralInfo.price)
              ) ?? 0}{' '}
              {currency.name}
            </span>
          </div>
        </div>
        <div
          onClick={toggle}
          className="flex relative items-center cursor-pointer h-[46px] rounded-[8px] px-[14px] border bg-[#FFFFFF1A] border-[#FFFFFF0D]"
        >
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
              className="top-[53px] right-0"
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
