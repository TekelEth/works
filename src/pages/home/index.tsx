import NavBar from '../../components/nav'
import Button from '../../components/ui/button'
import { images } from '../../utilities/images'
import CardLayout from '../../components/ui/card/price-tag'
import { features, marketData } from '../../__mockdata__/market'
import Footer from '../../components/footer'

const HomePage = () => {
  return (
    <div className='bg-black w-full relative'>
        <div className='bg-background z-10 bg-no-repeat h-[593px] lg:w-[965px] right-0 absolute' />
        <NavBar />
        <div className='flex px-16 items-center relative h-[calc(100vh-96px)] '>
            <div className='lg:w-[556px] -mt-32 flex flex-col'>
                <h1 className='text-[64px]/[70px] font-montserrat text-white font-bold'>Mint and Earn, Tokens</h1>
                <span className='text-[24px]/[37px] font-montserrat pl-3 pt-2 text-light-100'>TurboAnchor is the autonomous interest rate protocol for minting on TurboLend Protocol</span>
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
        <div className='px-20 flex items-center pb-18 justify-between'>
           <img src={images.hodl} alt="hodl-image" className='w-[426px] h-[507px]' />
           <div className='flex flex-col w-[750px] mr-12'>
                <h1 className='text-[40px] font-montserrat font-bold text-white'>HODL + EARN</h1>
                <span className='text-white py-5 text-[23px]/[43px] font-montserrat'>Improve the performance of your Turbo Anchor while retaining full control of your private keys.</span>
                <Button variant={'outline'} className='w-[227px] h-[68px] mt-4 rounded-[36px]'>View Whitepaper</Button>
           </div>
        </div>
        <div className='flex py-10 flex-col'>
            <div className='max-w-[900px] mb-6 flex items-center justify-center flex-col mx-auto'>
                <Button variant={'primary'} className='w-[229px] h-[77px] rounded-[37px] text-[24px]'> Our Features</Button>
                <h2 className='text-white py-6 text-center text-[35px]/[38px]'>The token that is disrupting the global financial industry</h2>    
            </div> 
            <div className='grid px-16 grid-cols-2 grid-rows-2 gap-8'>
                {
                    features.map((feature, index) => (
                        <CardLayout size={'xl'} key={index} className='col-span-1 row-span-1' variant={'white'}>
                            <div className='flex items-center'>
                                <div className='bg-primary-100 w-[153px] h-[124px] rounded-[22px] mr-6 flex items-center justify-center'>
                                    <img src={feature.icon} alt="feature-icon" />
                                </div>
                                <div className='flex flex-col w-[433px]'>
                                    <h2 className='mb-3 font-montserrat font-bold text-[28px]/[30px]'>{feature.header}</h2>
                                    <span className='text-gray-200 text-[21px]/[33px] font-nunito'>{feature.content}</span>
                                </div>
                            </div>
                        </CardLayout>
                    ))
                }
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default HomePage