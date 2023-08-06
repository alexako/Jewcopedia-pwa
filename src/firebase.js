// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFcktQHNouVYzYUQjPQmTDKzcsJY9rmnc",
  authDomain: "jewcopedia.firebaseapp.com",
  databaseURL: "https://jewcopedia-default-rtdb.firebaseio.com",
  projectId: "jewcopedia",
  storageBucket: "jewcopedia.appspot.com",
  messagingSenderId: "87150753840",
  appId: "1:87150753840:web:ac837322ea61502936d5f5",
  measurementId: "G-VPY5FY4X3C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);