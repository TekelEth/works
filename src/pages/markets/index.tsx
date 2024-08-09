import { images } from '../../utilities/images';
import Table from './market-table';

const MarketDashboard = () => {
  return (
    <div className="px-20">
      <div className=" w-full border border-[#FFFFFF4D] min-h-[400px] rounded-[10px]">
        <div className="flex items-center border-b border-[#FFFFFF4D] justify-between px-[30px] py-[18px]">
          <h1 className="text-bold text-[35px]/[50px]">Markets</h1>
          <div className="w-[333px] h-[54px] relative flex items-center rounded-[8px] border border-light-400 px-[15px] py-[20px]">
            <img
              src={images.searchIcon}
              width={18}
              height={18}
              alt="search-icon"
              className="absolute left-6"
            />
            <input
              type="text"
              className="w-full ml-10 bg-transparent placeholder:text-light-200 focus:outline-none font-montserrat text-light-200 text-[14px]"
              placeholder="Search assets name"
            />
          </div>
        </div>
        <Table />
      </div>
    </div>
  );
};

export default MarketDashboard;
