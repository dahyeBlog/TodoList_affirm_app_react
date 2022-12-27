// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwTZFk1SZsB7fdZVDkGU2mHDDfb1uiWXc",
  authDomain: "positive-react-app.firebaseapp.com",
  projectId: "positive-react-app",
  storageBucket: "positive-react-app.appspot.com",
  messagingSenderId: "894578388482",
  appId: "1:894578388482:web:bb14baf3cfb2683259c11b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage()
const firestoreDb = getFirestore()
const analytics = getAnalytics()

export { auth, firestoreDb, analytics, storage };