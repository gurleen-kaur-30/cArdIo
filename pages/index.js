import Head from 'next/head'
import styles from '../styles/index.module.scss'
import utilStyles from '../styles/util.module.scss'
import GetStarted from '../components/getStarted.js'

export default function Home() {
  return (
    <html  className={styles.container}>
    <Head >
      <p className={utilStyles.heading2Xl}>cArdIo</p>
      <p className={utilStyles.headingXl}> Your personal AI trainer</p>
    </Head>
    {/* <GetStarted/> */}
    </html>
  )
}
