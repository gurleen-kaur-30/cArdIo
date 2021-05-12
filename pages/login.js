import React from 'react'
import TextInput from '../components/textinput'
class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        email: '',
        password: ''
    }

    this.setEmail = this.setEmail.bind(this)
    this.setPassword = this.setPassword.bind(this)
  }

  setEmail(event){
    this.setState({email : event.target.value})
  }

  setPassword(event){
    this.setState({password: event.target.value})
  }
  render() {
    return (
      <form>
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
      </form>
    )
  }
}

export default Login