// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1FW6i6bk9eHri7lUtCiqAVdpLmhaKmDc",
  authDomain: "note-tracker-6b7ad.firebaseapp.com",
  projectId: "note-tracker-6b7ad",
  storageBucket: "note-tracker-6b7ad.appspot.app",
  messagingSenderId: "408996292043",
  appId: "1:408996292043:web:d713a78df99d9bdc5ec24e",
  measurementId: "G-ECPRPLJFWG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
