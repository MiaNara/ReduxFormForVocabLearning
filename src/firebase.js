// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDU0fFbJvOcV4Oi5nAupDAVGnkRxZTnN9c",
  authDomain: "lab7-88e32.firebaseapp.com",
  projectId: "lab7-88e32",
  storageBucket: "lab7-88e32.appspot.com",
  messagingSenderId: "293409436957",
  appId: "1:293409436957:web:1c5d2ad49547105cf85df4",
  measurementId: "G-7ZC6WL0QBN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();