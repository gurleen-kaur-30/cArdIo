import React from 'react'
import styles from './styles/card.module.scss'

export default class Card extends React.Component {
    render() {
      return(
          <div className={styles.card}>
            <img className={styles.cardImage} src={this.props.image} />
            <div className={styles.cardBody}>
              <h2 className={styles.cardText}>{this.props.title}</h2>
            </div>
          </div>
        )
    }
  }
