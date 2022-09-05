import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import BrandAI from '../components/brandai'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>BRANDIT | AI Generated Marketing</title>
        <meta
          name='description'
          content='Generated branding snippets for your product'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <BrandAI />
    </div>
  )
}

export default Home
