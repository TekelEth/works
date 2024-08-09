import AssetsDisplay from './components/assets-display';
import BorrowFunds from './components/borrow-funds';
import CollateralTable from './components/collateral-table';
import Collaterall from './components/collaterall';
import ValueRating from './components/value-rating';

const Dashboard = () => {
  return (
    <div className="px-20">
      <div className="grid grid-cols-2 h-[645px] gap-10 grid-rows-6">
        <AssetsDisplay />
        <Collaterall />
        <BorrowFunds />
        <ValueRating />
      </div>
      <CollateralTable />
    </div>
  );
};

export default Dashboard;
