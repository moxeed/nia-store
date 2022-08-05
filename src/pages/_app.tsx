import "../styles/globals.css"
import type {AppProps} from "next/app"
import {Container} from "rsuite"
import React from "react"
import Head from "next/head"

function MyApp({Component, pageProps}: AppProps) {
    return (
        <>
            <Head>
                <title>{"نیاکالا | فروشگاه آنلاین لوازم خانگی"}</title>
            </Head>
            <Container dir="rtl" className="h-full bg-gray-200">
                <Component {...pageProps} />
            </Container>
        </>
    );
}

export default MyApp;
