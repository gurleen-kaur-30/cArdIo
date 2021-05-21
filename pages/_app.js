import initAuth from '../utils/initAuth' // the module you created above
import firebase from 'firebase/app'
import { AuthProvider } from '../auth.tsx';
import {firebaseConfig} from '../config/firebase.ts'


initAuth()
if (!firebase.apps.length) {

  try{
    firebase.initializeApp(firebaseConfig);


  } catch(e){
    console.log(e)
  }
}else {
  firebase.app(); // if already initialized, use that one

}

function MyApp({ Component, pageProps }) {
  return (
  <AuthProvider>
  <Component {...pageProps} />
  </AuthProvider>
  )
}

export default MyApp;