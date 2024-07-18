import { features } from "../../../__mockdata__/market"
import Button from "../../../components/ui/button"
import CardLayout from "../../../components/ui/card/price-tag"

const Features = () => {
  return (
    <div className='flex py-10 flex-col'>
    <div className='max-w-[900px] mb-6 flex items-center justify-center flex-col mx-auto'>
        <Button variant={'primary'} className='w-[229px] h-[77px] rounded-[37px] text-[20px]'> Our Features</Button>
        <h2 className='text-white py-6 text-center text-[28px]/[30px]'>The token that is disrupting the global financial industry</h2>    
    </div> 
    <div className='grid px-16 grid-cols-2 grid-rows-2 gap-8'>
        {
            features.map((feature, index) => (
                <CardLayout size={'xl'} key={index} className='col-span-1 row-span-1' variant={'white'}>
                    <div className='flex items-center'>
                        <div className='bg-primary-100 w-[140px] h-[120px] rounded-[22px] mr-6 flex items-center justify-center'>
                            <img src={feature.icon} alt="feature-icon" />
                        </div>
                        <div className='flex flex-col w-[433px]'>
                            <h2 className='mb-3 font-montserrat font-bold text-[20px]/[30px]'>{feature.header}</h2>
                            <span className='text-gray-200 text-[16px]/[22px] font-nunito'>{feature.content}</span>
                        </div>
                    </div>
                </CardLayout>
            ))
        }
    </div>
</div>
)
}

export default Features