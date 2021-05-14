import React from 'react'
import TextInput from '../components/textinput'
import styles from './styles/login.module.scss'
import utilStyles from '../styles/util.module.scss'
class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        email: '',
        password: '',
        confirmPassword : ''
    }

    this.setEmail = this.setEmail.bind(this)
    this.setPassword = this.setPassword.bind(this)
    this.signup = this.signup.bind(this)
  }

  setEmail(event){
    this.setState({email : event.target.value})
  }

  setPassword(event){
    this.setState({password: event.target.value})
  }

  setConfirmPassword(event){
      this.setState({confirmPassword: event.target.value})
  }
  signup(){
    console.log("logged in!")
  }
  render() {
    return (
      <div className={styles.box}>
      <form className={styles.form}>
        <p className={utilStyles.headingXl}> SIGN UP TO START YOUR FITNESS JOURNEY</p>
       <div className={styles.innerBox}>
        <TextInput 
          labelName={"Email"}
          type={"text"}
          value={this.state.email}
          onChange={this.setEmail}
        />

        <TextInput 
          labelName={"Password"}
          type={"text"}
          value={this.state.password}
          onChange={this.setPassword}
        />
        <TextInput 
          labelName={"Confirm Password"}
          type={"text"}
          value={this.state.password}
          onChange={this.setConfirmPassword}
        />
        </div>
        <div>
        <button className={utilStyles.button} onClick={this.signup}>
          <text className={utilStyles.text}>
            SIGN UP
          </text>
        </button>
        </div>
       
      </form>
      </div>
    )
  }
}

export default Login