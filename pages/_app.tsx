// pages/_app.tsx
import "@mantine/core/styles.css";
import type { AppProps } from "next/app";
import { MantineProvider, createTheme } from "@mantine/core";
import Head from "next/head";
import WebLayout from "../components/WebLayout";
import '../styles/globals.css';

const theme = createTheme({
  // Add custom theme settings here if needed
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <Head>
        <title>VC AL-AAF.</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <WebLayout>
        <Component {...pageProps} />
      </WebLayout>
    </MantineProvider>
  );
}
