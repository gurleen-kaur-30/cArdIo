
import React from 'react'
import styles from './textinput.module.scss'
class TextInput extends React.Component{
    render(){
        return(
        <label>
          <p className={styles.labelText}> {this.props.labelName} </p>
          <input className={styles.input} type="text" value={this.props.value} onChange={this.props.onChange} />
        </label> 
        )
    }
}

export default TextInput