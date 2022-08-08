import "../styles/globals.css"
import type {AppProps} from "next/app"
import {Container} from "rsuite"
import React from "react"
import Head from "next/head"
import {CustomContext} from "rsuite/CustomProvider";

function MyApp({Component, pageProps}: AppProps) {
    return (
        <>
            <Head>
                <title>{"نیاکالا | فروشگاه آنلاین لوازم خانگی"}</title>
                <meta name="mobile-web-app-capable" content="yes"/>
            </Head>
            <Container dir="rtl" className="h-full">
                <CustomContext.Provider value={{rtl: true}}>
                    <Component {...pageProps} />
                </CustomContext.Provider>
            </Container>
        </>
    );
}

export default MyApp;
