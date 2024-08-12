import { Link } from 'react-router-dom';
import ProgressBar from '../../../components/progressbar';
import Button from '../../../components/ui/button';
import { images } from '../../../utilities/images';

const BorrowFunds = () => {
  return (
    <div className="border-line  col-start-2 px-[30px] py-[20px] col-span-1 row-span-5">
      <div className="flex items-center ">
        <h1 className="text-[20px] text-bold mr-2">My Minted Funds</h1>
        <img src={images.sortIcon} alt="img-icon" />
      </div>
      <div className="h-[118px] mt-6 px-6 py-4 flex items-center justify-between border rounded-[15px] border-[#302E2E]">
        <div className="flex items-center">
          <img
            src={images.asud}
            width={36}
            height={36}
            alt="usdt-img"
            className="mr-2"
          />
          <div className="flex items-center">
            <h1 className="text-bold text-[32px]/[40px]">0.00</h1>
            <span className="text-[16px]/[19px] ml-2 text-[#FFFFFF] font-montserrat mt-1">
              aUSD
            </span>
          </div>
        </div>
      </div>
      <div className="my-8 pt-8 border-t border-[#302E2E] px-5 flex items-center justify-between ">
        <Link to={'/dashboard/borrow'}>
          <Button variant={'primary'} className="w-[135px] h-[46px]">
            Mint
          </Button>
        </Link>
        <Link to={'/dashboard/repay'}>
          <Button variant={'outline'} className="w-[135px] h-[46px]">
            Repay
          </Button>
        </Link>
      </div>
      <div className="px-5 mt-10 flex items-center justify-between">
        <div className="flex items-center ">
          <span className="text-[15px]  text-white font-montserrat font-normal mr-2">
            My Minted Funds
          </span>
          <img src={images.sortIcon} width={14} height={14} alt="img-icon" />
        </div>
        <div className="flex items-center ">
          <img
            src={images.connector}
            width={31}
            height={8}
            alt="img-icon"
            className="mr-2"
          />
          <span className="text-[14px] text-[#FFFFFFB2]">
            Liquidation Alert
          </span>
        </div>
      </div>

      <div className="px-5 mt-7">
        <ProgressBar progress={40} />
      </div>

      <div className="px-5 mt-9 flex items-center justify-between">
        <div className="flex items-center ">
          <span className="text-[14px] mr-2 text-[#FFFFFFB2]">
            Liquidation BNB price: $0
          </span>
          <img src={images.sortIcon} width={12} height={12} alt="img-icon" />
        </div>
        <div className="flex items-center ">
          <span className="text-[14px] mr-2 text-[#FFFFFFB2]">
             Limit: $0
          </span>
          <img src={images.sortIcon} width={12} height={12} alt="img-icon" />
        </div>
      </div>
    </div>
  );
};

export default BorrowFunds;
