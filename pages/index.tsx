import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>AxoIdle — An Idle RPG for Axolittles</title>
        <meta name="description" content="AxoIdle — An Idle RPG for Axolittles NFT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to AxoIdle!
        </h1>
        <Link href='/game'><a>Play the game</a></Link>
      </main>
    </div>
  )
}

export default Home
