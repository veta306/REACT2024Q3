import type { AppProps } from "next/app";
import "../styles/global.scss";
import { Provider } from "react-redux";
import { ThemeProvider } from "../contexts/ThemeContext";
import { wrapper } from "../store/store";
import ErrorBoundary from "../components/ErrorBoundary";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";

export default function App({ Component, pageProps }: AppProps) {
  const { store } = wrapper.useWrappedStore(pageProps);

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsLoading(true);
    };

    const handleRouteChangeEnd = () => {
      setIsLoading(false);
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeEnd);
    router.events.on("routeChangeError", handleRouteChangeEnd);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeEnd);
      router.events.off("routeChangeError", handleRouteChangeEnd);
    };
  }, [router]);

  return (
    <>
      <Head>
        <title>Star Wars API</title>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Head>
      <Provider store={store}>
        <ThemeProvider>
          <ErrorBoundary>
            {isLoading && <Spinner />}
            <Component {...pageProps} />
          </ErrorBoundary>
        </ThemeProvider>
      </Provider>
    </>
  );
}
