import Button from "../../components/ui/button"
import DepositInput from "../../components/ui/input/deposit-input"
import { images } from "../../utilities/images"

const DepositPage = () => {
  return (
    <div className='pb-8 max-w-[900px] mx-auto'>
        <h1 className='text-bold mb-8 text-[38px] text-center'>Deposit Collateral</h1>

        <DepositInput 
          topLeft="Deposit Amount"
          topRight="Max 0 usdt"
          rightCoin= {
            <div className="flex items-center">
            <img src={images.usdt} alt="coin-icon" width={22} height={22} />
            <div className="text-[16px]/[21px] ml-2 font-montserrat  text-white">USDT</div>
        </div>
          }
        />

        <div className="py-8 flex items-center justify-center">
            <img src={images.filter} height={50} width={45} alt="filter-icon" />
        </div>

      <DepositInput 
          topLeft="New Borrow Limit"
          rightCoin= {
            <div className="flex items-center">
            <img src={images.asud} alt="coin-icon" width={22} height={22} />
            <div className="text-[16px]/[21px] ml-2 font-montserrat  text-white">aUSD</div>
        </div>
          }
        />
        <div className="flex mt-6  justify-center items-center">
          <img src={images.danger} alt="danger-icon" width={19} height={19} className="mr-2"/>
          <span className="text-white font-montserrat text-[14px]">Borrowing starts from 15 lisUSD. Make a bigger deposit to be able to borrow lisUSD</span>
        </div>
        <Button variant={'primary'} fullWidth className="mt-10 h-[60px]"> Deposit </Button>
    </div>
  )
}

export default DepositPage