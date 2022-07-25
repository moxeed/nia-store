import "../styles/globals.css"
import type { AppProps } from "next/app"
import { Container } from "rsuite"
import React from "react"
import Head from "next/head"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>{"نیاکالا | فروشگاه آنلاین لوازم خانگی"}</title>
      </Head>
      <Container dir="rtl" style={{ height: "100%" }}>
        <Component {...pageProps} />
      </Container>
    </div>
  );
}

export default MyApp;
