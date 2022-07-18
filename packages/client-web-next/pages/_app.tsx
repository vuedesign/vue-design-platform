import type { AppProps } from "next/app";
import "antd/dist/antd.css";
import "../styles/globals.scss";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../libs/apolloClient";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
