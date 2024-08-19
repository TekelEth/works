import { formatAmount } from '../../../utilities/formater';
import { ToatalProp } from '../../../interface';

const AssetsDisplay = ({total}: {total: ToatalProp}) => {
  
  return (
    <div className="w-full col-span-2 row-span-1  text-[#FFFFFFCC] border-line flex items-center justify-between h-[96px] px-[30px]">
      <div className="flex items-center">
        <p className="font-[500] font-montserrat text-[20px]">
          Total Collateral:{' '}
          <span className="font-bold">
            {formatAmount(total.collaterall) ?? 0}
          </span>
        </p>
      </div>
      <div className="flex items-center">
        <p className="font-[500] font-montserrat text-[20px]">
          Total Minted: <span className="font-bold">  {formatAmount(total.borrowed) ?? 0} aUSD</span>
        </p>
      </div>
      <div className="flex items-center">
        <p className="font-[500] font-montserrat text-[20px]">
          Net Asset Value: <span className="font-bold">{formatAmount(total.netAsset)} aUSD</span>
        </p>
      </div>
    </div>
  );
};

export default AssetsDisplay;
