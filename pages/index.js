import Head from 'next/head'
import styles from '../styles/index.module.scss'
import utilStyles from '../styles/util.module.scss'
import Link from 'next/link'

export default function Home() {
  return (
    <div >
      <div className={styles.container}/>
    <div className={styles.head}>
    <p className={styles.heading2Xl}> cArdIo </p>
    <p className={styles.heading2Xl}> Your personal AI trainer</p>
    </div>
    <div className={styles.row}>
    <Link href={"/login"}>
    <button className={styles.button}>
      <p className={utilStyles.text}> Log In</p>
    </button>
    </Link>
    <Link href={"/signup"}>
    <button className={styles.button}>
      <p className={utilStyles.text}> Sign Up </p>
    </button>
    </Link>
    </div>
    </div>
  )
}
