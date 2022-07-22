import '../styles/globals.css'

import type {AppProps} from 'next/app'
import {Container} from 'rsuite';
import React from "react";


function MyApp({Component, pageProps}: AppProps) {
    return (
        <Container dir='rtl' className="bg-gray-200" style={{height:"100%"}}>
            <Component {...pageProps} />
        </Container>
    )
}

export default MyApp
