import { Link } from 'react-router-dom'
import { images } from '../../utilities/images'
import { footerlinks, mediaLinks } from '../../utilities/links'

const Footer = () => {
  return (
    <footer className='pb-20'>
        <div className='mt-20 py-[30px] mb-8 px-20 border-y border-[#E3E3E333] grid-rows-1 grid grid-cols-7 items-center justify-between'>
        <div className='col-span-3 flex flex-col w-[405px]'>
        <Link to={'/'}>
            <img src={images.logo} alt="logo-image" />
        </Link>
        <span className='font-montserrat text-gray-200 mt-6 text-[20px]/[34px]'>
            It is a long established fact that from
            will be distracted by the readable 
            from when looking.
        </span>
        </div>
        <div className='flex col-span-2 -ml-8 flex-col'>
            <div className='flex mb-4'>
                <img src={images.email} alt="email-icon" className='mr-3 -mt-8' />
                <div className='flex flex-col'>
                    <span className='font-montserrat mb-2 text-gray-200 text-[20px]/[34px]'>
                        turboanchor@gmail.com
                    </span>
                    <span className='font-montserrat  text-gray-200 text-[20px]/[34px]'>
                        mail@turboanchor.com
                    </span>
                </div>
            </div>
            <div className='flex'>
                <img src={images.phone} alt="email-icon" className='mr-3 -mt-8' />
                <div className='flex flex-col'>
                    <span className='font-montserrat mb-2 text-gray-200 text-[20px]/[34px]'>
                        +987 6541 3654
                    </span>
                    <span className='font-montserrat  text-gray-200 text-[20px]/[34px]'>
                        +001 6547 6589
                    </span>
                </div>
            </div>
        </div>
        <div className='col-span-1  flex flex-col gap-y-4'>
            {
                footerlinks.map((link, index) => (
                    <Link to={link.href} key={index}>
                        <span className='font-montserrat  text-gray-200 text-[20px]/[34px]'>
                            {link.title}
                        </span>
                    </Link>
                ))
            } 
        </div>
        <div className='col-span-1 ml-8 flex flex-col gap-y-4'>
            {
                mediaLinks.map((link, index) => (
                    <Link to={link.href} key={index}>
                        <img src={link.icon} alt="media-links" className='mb-3' />
                    </Link>
                ))
            } 
        </div>
    </div>
    <span className='font-montserrat px-20  text-gray-200 text-[20px]/[34px]'>Copyright © TurboAnchor</span>
    </footer>
  )
}

export default Footer