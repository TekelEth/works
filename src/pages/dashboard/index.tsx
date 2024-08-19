import { useEffect, useState } from 'react';
import { ICurrency, InitialCurrency, ToatalProp } from '../../interface';
import AssetsDisplay from './components/assets-display';
import BorrowFunds from './components/borrow-funds';
import CollateralTable from './components/collateral-table';
import Collaterall from './components/collaterall';
import ValueRating from './components/value-rating';
import { collateralAddresses, HexString } from '../../constants/contracts-abi';
import { ethers } from 'ethers';
import useTokenHooks from '../../hooks/token-hooks';


const Dashboard = () => {
  const [currency, setCurrency] = useState<ICurrency>(InitialCurrency);
  const [total, setTotal] = useState<ToatalProp>({
    collaterall: '0',
    borrowed: '0',
    netAsset: '0'
  });
  const { fetchCollateralBalance, fetchUserBorrowedBalance } = useTokenHooks()


  const fetchAllTotalInfo = async (addresses: HexString[]) => {
    const fetchCollaterall = await Promise.all(addresses.map(fetchCollateralBalance));
    const fetchBorrowed = await Promise.all(addresses.map(fetchUserBorrowedBalance))
    const totalCollateral = (await fetchCollaterall.reduce(
      (accumulator: any, currentValue: any) => accumulator + currentValue
    )) as string;
    const totalBorrowed = (await fetchBorrowed.reduce(
      (accumulator: any, currentValue: any) => accumulator + currentValue
    )) as string;
    setTotal({
      collaterall: Number(ethers.formatUnits(totalCollateral)).toFixed(2),
      borrowed: Number(ethers.formatUnits(totalBorrowed)).toFixed(2),
      netAsset: (Number(ethers.formatUnits(totalCollateral)) - Number(ethers.formatUnits(totalBorrowed))).toFixed(2)
    });
  };

  useEffect(() => {
    fetchAllTotalInfo(collateralAddresses);
  }, []);

  return (
    <div className="px-20">
      <div className="grid grid-cols-2 h-[645px] gap-10 grid-rows-6">
        <AssetsDisplay total={total} />
        <Collaterall currency={currency} setCurrency={setCurrency} />
        <BorrowFunds currency={currency} borrowed={total.borrowed} />
        <ValueRating currency={currency} />
      </div>
      <CollateralTable />
    </div>
  );
};

export default Dashboard;
