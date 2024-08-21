import { CircularProgressBar } from '../../../components/progressbar'

const Utilization = ({maxBorrow}: {maxBorrow: {max: string,utilization: number } }) => {
  return (
    
    <div className='border-[#FFFFFF4D] px-[34px] h-[230px] border flex items-center justify-between bg-[#FFFFFF0D] rounded-[15px] mt-10'>
    <span className="text-[14px] mr-2 text-[#FFFFFFCC] font-montserrat"> Borrow Utilizaton </span>
      <div className='w-[150px] h-[150px]'>
        <CircularProgressBar progress={Number(maxBorrow.utilization.toFixed(2))/100} />
      </div>
    <span className="text-[14px] mr-2 text-[#FFFFFFCC] font-montserrat">Withdrawal Limit {maxBorrow.max} aUSD</span>
  </div>
  )
}

export default Utilization