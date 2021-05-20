import React from 'react'
import Card from '../components/card.js'
import utilStyles from '../styles/util.module.scss'
import styles from './styles/dashboard.module.scss'
import Link from 'next/link'
import firebase from 'firebase/app'
import nookies from "nookies";
import AuthenticatedPage from "./authenticated"
import { GetServerSidePropsContext } from 'next'
import { firebaseAdmin } from '../firebaseAdmin'
import {firebaseClient} from '../firebaseClient'
import Router  from 'next/router'
import axios from 'axios';


export const getServerSideProps = async (GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(GetServerSidePropsContext);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const { uid, email } = token;
    await axios.get(`http://localhost:3000/api/user/${uid}`);
    return {
      props: {uid},
    };
  } catch (err) {
    console.log(err)
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      // `as never` is required for correct type inference
      // by InferGetServerSidePropsType below
      // props: {} as never,
    };
  }
};

export default class Dashboard extends React.Component {
    render() {
      return(
          <div className={styles.body}>
              <div className={styles.textBox}>
                {firebase.auth().currentUser?
                    <p className={utilStyles.heading2Xl}>Hello {firebase.auth().currentUser.displayName}!</p>
                    :
                    null
                }
                </div>
                <div className={styles.textBox}>
                <p className={utilStyles.heading2Xl}> Choose Your Exercise </p>
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
              <button
                onClick={async () => {
                  await firebaseClient
                    .auth()
                    .signOut()
                    .then(() => {
                      Router.push("/login");
                    });
                }}
              >
                Sign out
              </button>
          </div>
      )
    }
  }
