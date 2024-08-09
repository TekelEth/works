import { images } from '../utilities/images';

export const marketData = [
  {
    title: 'Total Mint',
    amount: '$ 3,695,368,327.98s',
  },
  {
    title: 'Available to Mint',
    amount: '$ 876,356,764.53',
  },
  {
    title: 'Total Collateral Amount',
    amount: '$ 1,254,543,654.98',
  },
];

export const features = [
  {
    header: 'Safe, Secure, and Unstoppable',
    content:
      'turboUSD is an immutable, decentralized stablecoin with no centralized counterparty risk. Information across different chains is communicated via Biturbo’s relay nodes, eliminating human risk and ensuring security',
    icon: images.icon3,
  },

  {
    header: 'Cross-Chain Liquidity Aggregation',
    content:
      'Leveraging Biturbo’s infrastructure, TurboAnchor enables users to stake various assets across different chains and mint turboUSD on the Biturbo chain, facilitating seamless cross-chain liquidity aggregation.',
    icon: images.icon2,
  },
  {
    header: 'Boosting Capital Efficiency in DeFi',
    content:
      ' turboUSD accepts liquidity from DEXs (LP tokens) as collateral, helping users enhance their liquidity and yields. Since LP tokens can exhibit lower volatility compared to single-token assets, TurboAnchor offers a lower collateral ratio compared to other stablecoins.',
    icon: images.icon4,
  },
  {
    header: 'Revenue Sharing',
    content:
      'TurboAnchor rewards $Anchor tokens to turboUSD minters and shares protocol revenue with $Anchor stakers, including minting and burning fees, and liquidation income, creating an incentive-driven ecosystem.',
    icon: images.icon1,
  },
];
