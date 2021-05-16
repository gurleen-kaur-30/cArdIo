import React from 'react'
import Card from '../components/card.js'
import utilStyles from '../styles/util.module.scss'
import styles from './styles/dashboard.module.scss'
import Link from 'next/link'
import firebase from 'firebase/app'

export default class Dashboard extends React.Component {
    
    render() {
      return(
          <div className={styles.body}>
              <div className={styles.textBox}>
                {firebase.auth().currentUser?
                    <text className={utilStyles.heading2Xl}>Hello {firebase.auth().currentUser.displayName}!</text>
                    :
                    null
                }
                </div>
                <div className={styles.textBox}>
                <text className={utilStyles.heading2Xl}> Choose Your Exercise </text>
              </div>
              <div className={styles.cardsBox}>
              <Card
                image="https://i.pinimg.com/originals/8c/53/27/8c532774e4e1c524576bf1fb829ad895.gif"
                title="Bicep Curls"
                href="/pose"
               />
               <Card
                image="https://177d01fbswx3jjl1t20gdr8j-wpengine.netdna-ssl.com/wp-content/uploads/2018/12/DB-Shoulder-Press.gif"
                title="Shoulder Press"
                href="/dashboard"
              />
              </div>
          </div>
      )
    }
  }
