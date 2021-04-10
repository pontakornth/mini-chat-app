import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'mini-chat-app-337e4.firebaseapp.com',
  databaseURL: 'https://mini-chat-app-337e4-default-rtdb.firebaseio.com',
  projectId: 'mini-chat-app-337e4',
  storageBucket: 'mini-chat-app-337e4.appspot.com',
  messagingSenderId: '115934291978',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

if (!firebase.apps.length) {
  firebase.initializeApp(clientCredentials)
}

export const auth = firebase.auth()
export const database = firebase.database()

export default firebase
