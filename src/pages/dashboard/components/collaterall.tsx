import { Link } from "react-router-dom"
import Button from "../../../components/ui/button"
import { images } from "../../../utilities/images"

const Collaterall = () => {
  return (
    <div className='col-span-1 row-span-3 px-[30px] py-[20px] border-line'>
      <div className="flex items-center ">
          <h1 className="text-[20px] text-bold mr-2">My Collateral</h1>
          <img src={images.sortIcon} alt="img-icon" />
      </div>
      <div className="h-[118px] mt-6 px-6 py-4 flex items-center justify-between border rounded-[15px] border-[#302E2E]">
          <div className="flex">
            <img src={images.usdt} width={36} height={36} alt="usdt-img" className="mr-2 -mt-6" />
            <div className="flex flex-col">
              <h1 className="text-bold text-[32px]/[40px]">2,370.00</h1>
              <span className="text-[16px]/[19px] text-[#FFFFFF80] font-montserrat mt-1">$2,370.00 aUSD</span>
            </div>
          </div>
          <div className="flex items-center h-[46px] rounded-[8px] px-[14px] border bg-[#FFFFFF1A] border-[#FFFFFF0D]">
          <img src={images.usdt} width={25} height={25} alt="usdt-img" className="mr-2" />
          <h1 className="font-montserrat text-[24px]/[30px] text-[#FFFFFFE5]">USDT</h1>
          </div>
      </div>
      <div className="mt-8 px-5 flex items-center justify-between ">
        <Link to={"/dashboard/deposit"}>
          <Button variant={'primary'} className="w-[133px] h-[46px]">Deposit</Button>
        </Link>
        <Link to={'/dashboard/withdrawal'}>
          <Button variant={'outline'} className="w-[133px] h-[46px]">Withdrawal</Button>
        </Link>
      </div>
    </div>
  )
}

export default Collaterall

