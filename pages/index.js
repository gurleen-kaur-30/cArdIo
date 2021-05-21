import Head from 'next/head'
import styles from '../styles/index.module.scss'
import utilStyles from '../styles/util.module.scss'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
    {/* <Head >
      <p className={utilStyles.heading2Xl}>cArdIo</p>
      <p className={utilStyles.headingXl}> Your personal AI trainer</p>
    </Head> */}
    <p className={utilStyles.heading2Xl}> cArdIo </p>
    <p className={utilStyles.heading2Xl}> Your personal AI trainer</p>
    <div className={styles.row}>
    <Link href={"/login"}>
    <button className={utilStyles.button}>
      <p className={utilStyles.text}> Log In</p>
    </button>
    </Link>
    <Link href={"/signup"}>
    <button className={utilStyles.button}>
      <p className={utilStyles.text}> Sign Up </p>
    </button>
    </Link>
    </div>

    </div>
  )
}
