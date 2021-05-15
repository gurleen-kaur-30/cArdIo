import React from 'react'
import styles from './styles/card.module.scss'
import Link from 'next/link'

export default class Card extends React.Component {
    render() {
      return(
        <Link href={this.props.href}>
          <div className={styles.card}>
            <img className={styles.cardImage} src={this.props.image} />
            <div className={styles.cardBody}>
              <h2 className={styles.cardText}>{this.props.title}</h2>
            </div>
          </div>
          </Link>
        )
    }
  }
