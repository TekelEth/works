import Button from '../../../components/ui/button'
import { images } from '../../../utilities/images'
import { marketData } from '../../../__mockdata__/market'
import CardLayout from '../../../components/ui/card/price-tag'

const Hero = () => {
  return (
    <div>
        <div className='flex px-16 items-center relative h-[calc(100vh-96px)] '>
            <div className='lg:w-[556px] -mt-32 flex flex-col'>
                <h1 className='text-[54px]/[60px] font-montserrat text-white font-bold'>Providing the Best On-Chain Utility for the US Dollar</h1>
                <span className='text-[20px]/[29px] font-montserrat pl-3 pt-4 text-light-100'>TurboAnchor provides the best on-chain liquidity for stablecoins through diversified liquid staking solutions.</span>
                <div className='mt-8 flex items-center gap-x-[25px]'>
                    <Button className='font-nunito rounded-[35px] h-[67px]' variant={'primary'}>Launch dApp</Button>
                    <Button className='font-nunito rounded-[35px] h-[67px]' variant={'outline'}>View Whitepaper</Button>
                </div>
            </div>
            <div className='z-50 -mt-10 absolute right-4'>
                <img src={images.backdrop} alt="backdrop" className='h-[710px] w-[800px]' />
            </div>
        </div>
        <div className='max-w-[1000px] mx-auto flex justify-between pt-[60px] pb-[120px] items-center gap-x-6'>
           {
            marketData.map((data, index) => {
                const active = index === 0
                return (
                    <CardLayout variant={`${active ? 'active' : 'outline'}`} className='rounded-[10px]'>
                                    <span className={`${active ? 'text-white' : 'text-gray-100'} font-[16px] font-montserrat mb-4`}>{data.title}</span>
                                      <h2 className='font-montserrat font-semibold text-[24px] text-white'>{data.amount}</h2>
                    </CardLayout>
                )
            })
           }
        </div>
    </div>
  )
}

export default Hero