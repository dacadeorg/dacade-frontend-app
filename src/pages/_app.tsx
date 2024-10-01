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
import { WagmiConfig } from "wagmi";
import { config } from "@/config/Web3Modal";
import { DefaultSeo } from "next-seo"
import SEO from "../../next-seo.config"

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
    <WagmiConfig config={config}>
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
              <DefaultSeo {...SEO} />
            </>
          )}
        </AuthObserver>
      </Provider>
    </WagmiConfig>
  );
};

export default appWithTranslation(App);
