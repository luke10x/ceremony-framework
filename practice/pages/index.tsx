import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <p>Practice addition for 5 minutes.</p>
        <p>How much you can score?</p>
        <Link href="/practice">
          <a>Go to practice</a>
        </Link>
      </main>

      <footer className={styles.footer}>
        <Link href="/zoo">
          <a>Other components</a>
        </Link>
      </footer>
    </div>
  )
}

export default Home
