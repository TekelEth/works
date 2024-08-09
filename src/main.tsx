import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './font.css';
import './index.css';
import WagmiProvider from './providers/wagmi-providers.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider>
      <App />
    </WagmiProvider>
  </React.StrictMode>
);
