
import React from 'react'
import styles from './styles/passwordinput.module.scss'
class PasswordInput extends React.Component{
    render(){
        return(
        <label>
          <p className={styles.labelText}> {this.props.labelName} </p>
          <input className={styles.input} type="text" value={this.props.value} onChange={this.props.onChange} />
        </label> 
        )
    }
}

export default PasswordInput