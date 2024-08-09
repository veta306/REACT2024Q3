import type { AppProps } from "next/app";
import "../styles/global.scss";
import { Provider } from "react-redux";
import { ThemeProvider } from "../contexts/ThemeContext";
import { store } from "../store/store";
import ErrorBoundary from "../components/ErrorBoundary";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Star Wars API</title>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Head>
      <Provider store={store}>
        <ThemeProvider>
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
        </ThemeProvider>
      </Provider>
    </>
  );
}
