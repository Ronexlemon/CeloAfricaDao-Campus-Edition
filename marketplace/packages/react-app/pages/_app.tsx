import { Alfajores, Celo } from "@celo/rainbowkit-celo/chains";
import celoGroups from "@celo/rainbowkit-celo/lists";
import { RainbowKitProvider,getDefaultConfig } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

import type { AppProps } from "next/app";
 import {  WagmiProvider, createConfig } from "wagmi";
// import { publicProvider } from "wagmi/providers/public";
import Layout from "../components/Layout";
import "../styles/globals.css";
import { celo, celoAlfajores } from "viem/chains";

const projectIdd = "48c5bba351a2f48fad4dac021d3c733b" //process.env.NEXT_PUBLIC_WC_PROJECT_ID as string; // get one at https://cloud.walletconnect.com/app

const config = getDefaultConfig({
  appName: 'MarketPlace',
  projectId: '48c5bba351a2f48fad4dac021d3c733b',
  chains: [celo,celoAlfajores],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

// const connectors = celoGroups({
//   chains,
//   projectId,
//   appName: (typeof document === "object" && document.title) || "Your App Name",
// });

// const appInfo = {
//   appName: "Celo Composer",
// };

// const wagmiConfig = createConfig({
//   connectors,
//   publicClient: publicClient,
// });
const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
      <RainbowKitProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
