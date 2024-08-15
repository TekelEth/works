import { FC, useEffect, useState } from 'react';
import useTokenHooks from '../../../hooks/token-hooks';
import { ICurrency } from '../../../interface';
import { images } from '../../../utilities/images';
import { ethers } from 'ethers';

interface IProp  {
  currency: ICurrency,
}


const ValueRating:FC<IProp> = ({currency}) => {
  const [apr, setApr] = useState('')
  const { fetchBorrowAPR  } = useTokenHooks();

  const fetchBorrow = async () => {
   const borrowApr =  await fetchBorrowAPR(currency.address) as number;
   const formattedAPR = Number(ethers.formatUnits(borrowApr)).toFixed(2);
   setApr(formattedAPR)
  }

  useEffect(() => {
    fetchBorrow()
  }, [currency])
  return (
    <div className="row-span-2 px-[30px] py-[25px] border-line">
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-7">
          <span className="text-[18px]/[25px] text-[#FFFFFF99] font-montserrat">
            Net Borrowing APR
          </span>
          <img src={images.linker} alt="linker-icon" width={14} height={14} />
          <span className="text-[18px]/[25px] text-[#FFFFFF99] font-montserrat mr-6">
           {apr} %
          </span>
        </div>
        {/* <div className="flex items-center justify-between mb-7">
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
        </div> */}
      </div>
    </div>
  );
};

export default ValueRating;
