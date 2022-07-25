import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { BrandHeader, Header } from '../product/components/container/header/header';
import { Banner } from '../product/components/landing/banner/banner';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <BrandHeader />
      <Header />
      <Banner />
    </div>
  )
}

export default Home
