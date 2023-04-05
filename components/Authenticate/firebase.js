// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "sanctuary-348d4.firebaseapp.com",
  projectId: "sanctuary-348d4",
  storageBucket: "sanctuary-348d4.appspot.com",
  messagingSenderId: "892316410621",
  appId: "1:892316410621:web:a8680fcf94bc8cab1b5494",
  measurementId: "G-HM5NSD0G67",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const authentication = getAuth(app);

export default authentication;