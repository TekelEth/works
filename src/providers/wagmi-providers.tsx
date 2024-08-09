import '@rainbow-me/rainbowkit/styles.css';
import {
  RainbowKitProvider,
  getDefaultWallets,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { testchain } from './chain/test-chain';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [testchain],
  [
    alchemyProvider({ apiKey: 'orWx7fEFOgCKA6CSwEPL-NtmvySUbwfM' }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'TurborAnchor',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

const demoAppInfo = {
  appName: 'TurborAnchor',
};

function WagmiProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider
          coolMode
          appInfo={demoAppInfo}
          chains={chains}
          theme={darkTheme({
            fontStack: 'system',
            accentColor: '#FB7200',
            accentColorForeground: 'white',
            borderRadius: 'small',
          })}
        >
          {children}
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}

export default WagmiProvider;
