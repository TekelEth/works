interface IProp {
    leftText: string;
    rightText: string;
    progress: number;
}

const SpinnerCard = ({ leftText, rightText, progress}: IProp) => {
  return (
    <div className='w-full border h-[230px] border-[#FFFFFF4D] bg-[#FFFFFF0D] rounded-[15px] py-[24px] px-[30px] flex items-center justify-between'>
         <span className='text-[14px] mr-2 text-[#FFFFFFCC] font-montserrat'>    {leftText}
         </span>
        <div className="progress-bar-container mt-1">
      <div
        className="progress-bar"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
         <span className='text-[14px] mr-2 text-[#FFFFFFCC] font-montserrat'>    {rightText}
         </span>
    </div>
  )
}

export default SpinnerCard