import Button from "../../components/ui/button"
import DepositInput from "../../components/ui/input/deposit-input"
import { images } from "../../utilities/images"

const Borrow = () => {
  return (
    <div className='pb-8 max-w-[900px] mx-auto'>
        <h1 className='text-bold text-[38px] justify-center text-center'>Borrow aUSD </h1>
        <div className='flex items-center justify-center mb-8'>
                <span className="text-[#FFFFFF99] font-montserrat text-[18px]">Your debt: 21.0038292 aUSd</span>
              <img src={images.sortIcon} className='ml-2' alt="sort-icon" width={12} height={12} />
          </div>
          <DepositInput
          topLeft="Borrow Amount"
          topRight="Max 20 USDT"
          rightCoin= {
            <div className="flex items-center">
            <img src={images.asud} alt="coin-icon" width={22} height={22} />
            <div className="text-[16px]/[21px] ml-2 font-montserrat  text-white">aUSD</div>
        </div>
          }
        />
        <div className="flex mt-6 mx-auto max-w-[700px]  justify-center items-center">
          <img src={images.danger} alt="danger-icon" width={19} height={19} className=""/>
          <span className="text-white text-center font-montserrat text-[14px]">You are above a 75% borrowing usage. It is recommended that you decrease this 
          by repaying loans or providing more collateral to lower the risk of a liquidation event</span>
        </div>

        <Button variant={'primary'} fullWidth className="mt-10 h-[70px]"> Borrow </Button>
    </div>

  )
}

export default Borrow