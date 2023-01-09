import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyC2A1XUJVrSejFyE4_yfCvITBvJfXhIIOY",
  authDomain: "pokedex-a4489.firebaseapp.com",
  projectId: "pokedex-a4489",
  storageBucket: "pokedex-a4489.appspot.com",
  messagingSenderId: "214526884510",
  appId: "1:214526884510:web:635cfdb4032ae7aa79598f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

//timestamp object function
const timestamp = firebase.firestore.Timestamp

export {projectFirestore, projectAuth, timestamp}

