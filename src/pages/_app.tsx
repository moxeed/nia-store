import '../styles/globals.css'
    
import type { AppProps } from 'next/app'
import {Container, CustomProvider} from 'rsuite';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Container dir='rtl'>
        <CustomProvider rtl>
            <Component {...pageProps} />
        </CustomProvider>
    </Container>
  )
}

export default MyApp
