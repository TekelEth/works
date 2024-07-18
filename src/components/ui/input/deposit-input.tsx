import React from 'react'
import { images } from '../../../utilities/images';

interface IProp {
    topLeft: string;
    topRight?: string;
    rightCoin: React.ReactNode
}

const DepositInput = ({topLeft, topRight, rightCoin}: IProp) => {
  return (
    <div className='w-full border border-[#FFFFFF4D] bg-[#FFFFFF0D] rounded-[15px] py-[24px] px-[30px] flex flex-col'>
        <div className='flex items-center justify-between pb-4'>
            <div className='flex items-center'>
                <span className='text-[14px] mr-2 text-[#FFFFFFCC] font-montserrat'>    {topLeft}
                </span>
                <img src={images.sortIcon} width={14} height={14} alt="sort-icon" />
            </div>
            {
                topRight &&
             <div className='flex items-center'>
                <span className='text-[14px] uppercase mr-2 text-[#FFFFFFB2] font-montserrat'>    {topRight}
                </span>
                <img src={images.sortIcon} width={14} height={14} alt="sort-icon" />
            </div>
            }
        </div>
        <div className='w-full border rounded-[7px] px-4 flex items-center justify-between border-[#302E2E] bg-[#FFFFFF0D] h-[65px]'>
            <input placeholder='0.00' type="text" className='w-[40%] font-bold text-white text-[25px] font-montserrat h-full placeholder:text-[25px] placeholder:text-white placeholder:font-montserrat focus:outline-none border-none bg-transparent' />
            <div className='border-l pl-5 border-[#FFFFFF66]'>
                {rightCoin}
            </div>
        </div>

    </div>
  )
}

export default DepositInput