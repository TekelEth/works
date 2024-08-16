import { useState } from 'react';
import { ICurrency, InitialCurrency } from '../../interface';
import AssetsDisplay from './components/assets-display';
import BorrowFunds from './components/borrow-funds';
import CollateralTable from './components/collateral-table';
import Collaterall from './components/collaterall';
import ValueRating from './components/value-rating';

const Dashboard = () => {
  const [currency, setCurrency] = useState<ICurrency>(InitialCurrency);

  return (
    <div className="px-20">
      <div className="grid grid-cols-2 h-[645px] gap-10 grid-rows-6">
        <AssetsDisplay />
        <Collaterall currency={currency} setCurrency={setCurrency} />
        <BorrowFunds currency={currency} />
        <ValueRating currency={currency} />
      </div>
      <CollateralTable />
    </div>
  );
};

export default Dashboard;
