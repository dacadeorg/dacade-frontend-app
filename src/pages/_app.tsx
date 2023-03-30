import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { wrapper } from "@/store";
import { Provider } from "react-redux";
const App = ({ Component, ...rest }: AppProps) => {
  const { store, props: pageProps } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default appWithTranslation(App);
