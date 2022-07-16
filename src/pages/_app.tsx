import 'rsuite/dist/rsuite.min.css';
import "tailwindcss/tailwind.css"
import '../styles/globals.css'
    
import type { AppProps } from 'next/app'
import { Container, Content, Header, Nav, Navbar } from 'rsuite';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Container dir='rtl'>
      <Header>
        <Navbar>
          <Nav pullRight>
            <Nav.Item>محصولات</Nav.Item>
          </Nav>
        </Navbar>
      </Header>
      <Content>
        <Component {...pageProps} />
      </Content>
    </Container>
  )
}

export default MyApp
