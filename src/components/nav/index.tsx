import { Link } from 'react-router-dom'
import { images } from '../../utilities/images'
import { navlinks } from '../../utilities/links'
import Button from '../ui/button'

const NavBar = () => {
  return (
    <nav className='px-16 py-6 w-full flex items-center justify-between'>
        <Link to={'/'}>
            <img src={images.logo} alt="logo-image" />
        </Link>
        <div className='flex items-center z-50 justify-between'>
            <ul className='flex items-center mr-8  justify-between bg-[#FFFFFF33] px-[43px] py-[20px] rounded-[32px]'>
                {
                    navlinks.map((link, index) => {
                        return (
                            <li key={index} className='font-clashDisplay text-white mr-6  text-[16px]/[20px] font-[500]'>
                                <Link to={link.href} >{link.title}</Link>
                            </li>
                        )
                    })
                }
            </ul>
            <Link to={'/dashboard/market'}>
                <Button  className='bg-white text-black text-[16px] font-nunito rounded-[33px] font-bold px-[21px] py-[30px]'>Launch dApp</Button>
            </Link>
        </div>
    </nav>
  )
}

export default NavBar