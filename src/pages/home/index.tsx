import NavBar from '../../components/nav'
import Footer from '../../components/footer'
import Hero from './sections/hero'
import Holdings from './sections/holdings'
import Features from './sections/features'

const HomePage = () => {
  return (
    <div className='bg-black w-full relative'>
        <div className='bg-background z-10 bg-no-repeat h-[593px] lg:w-[965px] right-0 absolute' />
        <NavBar />
        <Hero />
        <Holdings />
       <Features />
        <Footer />
    </div>
  )
}

export default HomePage