import initAuth from '../utils/initAuth' // the module you created above
import firebase from 'firebase/app'
import {firebaseConfig} from '../config/firebase.ts'

initAuth()
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp;