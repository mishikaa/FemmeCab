// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDQjYWSXT-BXtLnaaqgaVzl5-BKuRAnTj8",
  authDomain: "femmecab-8a865.firebaseapp.com",
  projectId: "femmecab-8a865",
  storageBucket: "femmecab-8a865.appspot.com",
  messagingSenderId: "744344749476",
  appId: "1:744344749476:web:841541f33e1dfee9ac6d31",
  measurementId: "G-M5XTTG4B6W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()
export {auth, provider};

const analytics = getAnalytics(app);