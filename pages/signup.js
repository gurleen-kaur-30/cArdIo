import { useState } from 'react';
import dashify from 'dashify';
import axios from 'axios';

import React from 'react'
import TextInput from '../components/textinput'
import styles from './styles/login.module.scss'
import utilStyles from '../styles/util.module.scss'
import { auth } from '../config/firebase.ts';
import Router from 'next/router'
import firebase from 'firebase/app'

  export default class Post extends React.Component{

    constructor(props){
        super(props);
        this.state={
            email: '',  
            name: '',
            age : '',
            password : ''
        }
        this.setName = this.setName.bind(this)
        this.setAge = this.setAge.bind(this)
        this.setEmail = this.setEmail.bind(this)
        this.setPassword = this.setPassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.signUp = this.signUp.bind(this)
    }
    
    signUp( name, email, password ){
      console.log("yoo")
      return auth
       .createUserWithEmailAndPassword(email, password)
       .then((response) => {
        var user = firebase.auth().currentUser;
        user.updateProfile({
          displayName: name,
        }).then(function() {
          // Update successful.
        }).catch(function(error) {
            console.log("error updating name");
          // An error happened.
        });
        Router.push('/dashboard');
         console.log("yo")
        console.log(response)
       })
       .catch((error) => {
         console.log("error")
         console.log(error)
        return { error };
       });
     };

    setName(event){
        this.setState({name : event.target.value})
      }
    
    setAge(event){
        this.setState({age: event.target.value})
      }

    setEmail(event){
        this.setState({email : event.target.value})
      }
    
    setPassword(event){
        this.setState({password: event.target.value})
      }

    async onSubmit() {
    console.log("Called onSubmit", this.state.name);
    await axios.post('/api/user', { name: this.state.name, age : this.state.age, email: this.state.email, slug: dashify(this.state.email), password: this.state.password });
    this.signUp(this.state.name,this.state.email, this.state.password)
  }

      render(){
          return(
                <div className={styles.box}>
                  <div className={styles.form}>
                    <p className={utilStyles.headingXl}> SIGN UP TO START YOUR FITNESS JOURNEY</p>
                   <div className={styles.innerBox}>
                    <TextInput 
                      labelName={"Email"}
                      type={"text"}
                      value={this.state.email}
                      onChange={this.setEmail}
                    />
            
                <TextInput 
                      labelName={"Age"}
                      type={"text"}
                      value={this.state.age}
                      onChange={this.setAge}
                    />
            
                <TextInput 
                      labelName={"Name"}
                      type={"text"}
                      value={this.state.name}
                      onChange={this.setName}
                    />
                <TextInput 
                      labelName={"Password"}
                      type={"text"}
                      value={this.state.password}
                      onChange={this.setPassword}
                    />
                    </div>
                    <div>
                    <button className={utilStyles.button} onClick={this.onSubmit}>
                      <text className={utilStyles.text}>
                        SIGN UP
                      </text>
                    </button>
                    </div>
                   
                  </div>
                  </div>
              );
      }

  }
  
