import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import { GoogleAuthProvider} from 'firebase/auth'

const firebaseApp = initializeApp({
    apiKey: "AIzaSyCTkEEBUHnM9jSX1INLvIr9XP6l4K1x1Ao",
    authDomain: "shawns-chatroom.firebaseapp.com",
    projectId: "shawns-chatroom",
    storageBucket: "shawns-chatroom.appspot.com",
    messagingSenderId: "830788372216",
    appId: "1:830788372216:web:d3f819e8a89ebdbe255d0d"
  });

  const db = getFirestore()
  const provider = new GoogleAuthProvider()

  export {db, provider}