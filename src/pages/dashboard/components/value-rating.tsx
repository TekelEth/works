import { images } from '../../../utilities/images';

const ValueRating = () => {
  return (
    <div className="row-span-2 px-[30px] py-[25px] border-line">
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-7">
          <span className="text-[18px]/[25px] text-[#FFFFFF99] font-montserrat">
            Net Borrowing APR
          </span>
          <img src={images.linker} alt="linker-icon" width={14} height={14} />
          <span className="text-[18px]/[25px] text-[#FFFFFF99] font-montserrat mr-6">
            9.50%
          </span>
        </div>
        <div className="flex items-center justify-between mb-7">
          <span className="text-[18px]/[25px] text-[#FFFFFF99] font-montserrat">
            Net Borrowing APR
          </span>
          <img src={images.linker} alt="linker-icon" width={14} height={14} />
          <span className="text-[18px]/[25px] text-[#FFFFFF99] font-montserrat mr-6">
            9.50%
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[18px]/[25px] text-[#FFFFFF99] font-montserrat">
            Net Borrowing APR
          </span>
          <img src={images.linker} alt="linker-icon" width={14} height={14} />
          <span className="text-[18px]/[25px] text-[#FFFFFF99] font-montserrat mr-6">
            9.50%
          </span>
        </div>
      </div>
    </div>
  );
};

export default ValueRating;
