import { images } from '../utilities/images';
import { Link, useLocation } from 'react-router-dom';
import { dashbaordLinks } from '../utilities/links';
import Button from '../components/ui/button';
import { useState } from 'react';
import ModalContainer from '../components/modal';
import WalletConnectModal from '../components/modal/connect-modal';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const NavigationLayout = () => {
  const router = useLocation();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <div className="px-20 py-6 flex items-center justify-between">
      <div className="flex items-center justify-between gap-x-10">
        <Link to={'/'} className="mr-2">
          <img src={images.logo} width={189} height={40} alt="logo-image" />
        </Link>
        {dashbaordLinks.map((link, index) => {
          const active = router.pathname.includes(link.href);
          return (
            <Link to={link.href} key={index}>
              <span
                className={`${active && 'border-b border-primary-100'} pb-3 font-montserrat text-white font-semibold text-[16px]/[20px]`}
              >
                {link.title}
              </span>
            </Link>
          );
        })}
      </div>
      <div className="flex items-center gap-x-4">
        <Button variant={'outline'} className="w-[128px] h-[45px]">
          <img src={images.groupMask} alt="mask-images" width={90} />
        </Button>
        <ConnectButton showBalance={false} />
        {/* <Button variant={'primary'} className='w-[158px] h-[45px]' onClick={() => setOpen(true)}>
                Connect Wallet
            </Button> */}
      </div>
      <ModalContainer open={open} close={close}>
        <WalletConnectModal close={close} />
      </ModalContainer>
    </div>
  );
};

export default NavigationLayout;
