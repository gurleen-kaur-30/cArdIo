import { useState } from 'react';
import dashify from 'dashify';
import axios from 'axios';
import React from 'react'
import TextInput from '../../components/textinput'
import styles from '../styles/login.module.scss'
import utilStyles from '../../styles/util.module.scss'
import DatePicker from 'react-date-picker';

const Post = () => {
  const [content, setContent] = useState({
    email: undefined,
    password: undefined,
  })
  const onChange = (e) => {
    const { value, name } = e.target;
    setContent(prevState => ({ ...prevState, [name]: value }));
  }
  const onSubmit = async () => {
    const { name, dob, email, password } = content;
    await axios.post('/api/user', { name, email, dob, slug: dashify(email), password });
  }
  return (
    <div className={styles.box}>
    <form className={styles.form}>
      <p className={utilStyles.headingXl}> SIGN UP TO START YOUR FITNESS JOURNEY</p>
     <div className={styles.innerBox}>
     <TextInput 
        labelName={"Name"}
        type={"text"}
        value={content.password}
        onChange={onChange}
      />
      <DatePicker
        onChange={onChange}
        value={content.dob}
      />

      <TextInput 
        labelName={"Email"}
        type={"text"}
        value={content.email}
        onChange={onChange}
      />

      <TextInput 
        labelName={"Password"}
        type={"text"}
        value={content.password}
        onChange={onChange}
      />

      </div>
      <div>
      <button className={utilStyles.button} onClick={onSubmit}>
        <text className={utilStyles.text}>
          SIGN UP
        </text>
      </button>
      </div>
     
    </form>
    </div>
  );
};

export default Post;
