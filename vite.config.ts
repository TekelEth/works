import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // resolve: {
  //   alias: {
  //     "wagmi" : "node_modules/wagmi/dist/index.js",
  //     "@rainbow-me/rainbowkit" : "node_modules/@rainbow-me/rainbowkit/dist/indx.js",
  //     "viem": "node_modules/viem/_esm/actions/index.js",
  //     "@wagmi/core" : "node_modules/@wagmi/core/dist/esm/actions/getConnectorClient.js"
  //   }
  // }
});
