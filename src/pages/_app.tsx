import "@/styles/globals.css";
import "../../public/assets/css/styles.scss";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { wrapper } from "@/store";
import { Provider } from "react-redux";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import AuthObserver from "@/contexts/AuthObserver";
import NextNProgress from "nextjs-progressbar";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { publicProvider } from "wagmi/providers/public";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { polygonMumbai, mainnet } from "wagmi/chains";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { walletConnectProvider } from "@web3modal/wagmi";

const projectId = "d8aaadc6360d76bdc9fb5793d85d9e69";
const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const { chains, publicClient } = configureChains([mainnet, polygonMumbai], [walletConnectProvider({ projectId }), publicProvider()]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [new WalletConnectConnector({ chains, options: { projectId, showQrModal: false, metadata } }), new InjectedConnector({ chains, options: { shimDisconnect: true } })],
  publicClient,
});
createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  themeVariables: {
    "--w3m-z-index": 1000,
  },
});

/**
 * Represents a Next.js page with a custom layout.
 * @typedef {NextPage & { getLayout?: (page: ReactElement) => ReactNode }} NextPageWithLayout
 */

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

/**
 * Props for the App component with a custom layout.
 * @typedef {AppProps & { Component: NextPageWithLayout }} AppPropsWithLayout
 */

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

/**
 * Renders the Next.js app with Redux store and i18n support.
 * @param {AppPropsWithLayout} props - The props for the App component.
 * @returns {ReactElement} The rendered Next.js app.
 */

const App = ({ Component, ...rest }: AppPropsWithLayout) => {
  const { store, props: pageProps } = wrapper.useWrappedStore(rest);

  /**
   * Gets the layout for the given page component.
   * @param {ReactElement} page - The page component to get the layout for.
   * @returns {ReactNode} The layout for the page component.
   */

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <WagmiConfig config={wagmiConfig}>
      <Provider store={store}>
        <AuthObserver>
          {getLayout(
            <>
              <NextNProgress
                color="#1B66F8"
                startPosition={0.2}
                stopDelayMs={100}
                height={2.5}
                showOnShallow={true}
                options={{
                  showSpinner: false,
                  easing: "ease",
                  speed: 500,
                }}
              />

              <Component {...pageProps} />
            </>
          )}
        </AuthObserver>
      </Provider>
    </WagmiConfig>
  );
};

export default appWithTranslation(App);
