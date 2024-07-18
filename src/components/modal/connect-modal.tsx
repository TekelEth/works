import { wallets } from "../../__mockdata__/tables";
import { images } from "../../utilities/images"

interface IProp {
    img: string;
    name: string;
}

const Wallet = ({img, name}: IProp) => {
    return (
        <div className="bg-[#FFFFFF0D] mb-4 border py-3 cursor-pointer px-8 flex items-center border-primary-100 rounded-[15px] max-w-[80%] mx-auto">
        <img src={img} alt="wallet-icon" width={45} height={45} className="w-[45px] h-[45px] mr-4"  />
        <span className="text-[#FFFFFFCC] text-[19px] py-5 flex items-center justify-center text-center  font-montserrat">{name}</span>
    </div>

    )    
}

const WalletConnectModal = ({close}: {close: () => void}) => {
  return (
    <div className='border border-[#FFFFFF66] min-h-[500px]  rounded-[30px] w-[550px] bg-[#0D0D0D]'>
        <div className="w-full border-b py-8 relative border-[#FFFFFF66] ">
            <img width={20} height={20} src={images.cancel} alt="cancel-icon" className="absolute top-6 right-6 cursor-pointer" onClick={close}/>
            <h1 className="font-montserrat text-[18px] text-primary-100 text-center font-semibold">Connect Wallet</h1>
        </div>
        <span className="text-[#FFFFFFCC] text-[16px] py-5 flex items-center justify-center text-center  font-montserrat">Choose a wallet to connect</span>
        {
            wallets.map((wallet, index) => (
                <Wallet key={index} img={wallet.icon} name={wallet.name} />
            ))
        }
        <span className="text-white flex items-center justify-center pb-8 pt-5 font-semibold text-[14px]">By connecting, I accept TurboAnchor <p className="text-primary-100 ml-2">Terms of Service</p></span>
    </div>
  )
}

export default WalletConnectModal 