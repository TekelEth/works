import { images } from '../utilities/images'

const TopNavLayout = () => {
  return (
    <div className='px-20  flex items-center h-[80px] justify-between border-b border-light-400'>
    <div className='flex items-center gap-x-8 justify-between'>
        <p className='text-[14px]/[18px] font-montserrat text-white '>
            TVL:
            <span className='ml-2 text-primary-100'>
            $208,269,200
            </span>
        </p>
        <div className='flex items-center'>
            <img src={images.gainIcon} alt="gain-icon" className='mr-1' />
            <span className='text-[14px]/[18px] font-montserrat text-white '>0.34%</span>
        </div>
        <p className='text-[14px]/[18px] font-montserrat text-white '>
            aUSD Total Mint:
            <span className='ml-2 text-primary-100'>
                $122,486,602
            </span>
        </p>
        <div className='flex items-center'>
            <img src={images.lossIcon} alt="gain-icon" className='mr-1' />
            <span className='text-[14px]/[18px] font-montserrat text-white '>2.95%</span>
        </div>
        <p className='text-[14px]/[18px] font-montserrat text-white '>
            aUSD:
            <span className='ml-2 text-primary-100'>
                0.99746
            </span>
        </p>
    </div>
    <div className='bg-[#FB72001A] px-[15px] py-[10px] rounded-[5px]'>
        <span className='text-white text-[14px] font-outfit'>Available to Mint: aUSD: $200,000,000</span>
    </div>
</div>
)
}

export default TopNavLayout