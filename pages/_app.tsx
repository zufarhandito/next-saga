import "@/styles/globals.css";
import { Provider } from "react-redux";
import Layout from "./shared/layout";
import type { AppProps } from "next/app";
import store from "./redux/store";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  if (
    router.pathname.startsWith("/login") ||
    router.pathname.startsWith("/register")
  ) {
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    );
  }

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
