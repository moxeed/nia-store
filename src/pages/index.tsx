import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { BrandHeader, Header } from '../product/components/container/header/header';
import { Banner } from '../product/components/landing/banner/banner';
import Layout from './layout';

const Home: NextPage = () => {
  return (
    <Layout>
      <div className={styles.container}>
        {/* <BrandHeader />
        <Header /> */}
        <Banner />
      </div>
    </Layout>
  )
}

export default Home
