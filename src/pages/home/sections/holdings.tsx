import { images } from '../../../utilities/images'
import Button from '../../../components/ui/button'

const Holdings = () => {
  return (
    <div className='px-20 flex items-center pb-18 justify-between'>
           <img src={images.hodl} alt="hodl-image" className='w-[426px] h-[507px]' />
           <div className='flex flex-col w-[750px] mr-12'>
                <h1 className='text-[40px] font-montserrat font-bold text-white'>STAKE + Earn</h1>
                <span className='text-white py-5 text-[20px]/[33px] font-montserrat'>TurboAnchor is an open-source, decentralized stablecoin protocol powered by Biturbo. Users can stake various decentralized assets as collateral across different chains to mint turboUSD on the Biturbo chain. Leveraging Biturbo's infrastructure, TurboAnchor aims to create an innovative stablecoin that enhances capital efficiency in DeFi.</span>
                <Button variant={'outline'} className='w-[227px] h-[68px] mt-4 rounded-[36px]'>View Whitepaper</Button>
           </div>
        </div>
  )
}

export default Holdings