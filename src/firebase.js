// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, addDoc, getDocs, collection } from "firebase/firestore";
import {
  getAuth,
  signInWithPopup,
  signInWithEmailLink,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

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
  measurementId: "G-VPY5FY4X3C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
const auth = getAuth(app);

const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);

const logInWithEmailAndPassword = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res;
  } catch (err) {
    console.error(err);
    alert(err.message)
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  console.group();
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Created user successfully: ", res.user);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    console.log("Registered Successfully!", user);
    return user;
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
  console.groupEnd();
};

const sendPasswordReset = async (email) => {
  try {
    const res = await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
    return res;
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  ui,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
