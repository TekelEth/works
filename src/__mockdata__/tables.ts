import { contractAddress } from '../constants/contracts-abi';
import { images } from '../utilities/images';

export const collateralMarketTokens = [
  {
    icon: images.btc,
    name: 'WBBTC',
    contractAddress: contractAddress.wbbtc,
  },
  {
    icon: images.smallLogo,
    name: 'TA',
    contractAddress: contractAddress.ta,
  },
  {
    icon: images.smallLogo,
    name: 'TL',
    contractAddress: contractAddress.tl,
  },
  {
    icon: images.smallLogo,
    name: 'TBX',
    contractAddress: contractAddress.tbx,
  },
];

export const wallets = [
  {
    icon: images.metamask,
    name: 'Browser Wallet',
  },

  {
    icon: images.coinbase,
    name: 'Coinbase Wallet',
  },

  {
    icon: images.phantom,
    name: 'Phantom Wallet',
  },

  {
    icon: images.walletConnect,
    name: 'WalletConnect',
  },
];
