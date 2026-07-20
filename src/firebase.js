// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA47BuLTw3l6p0ErlacACIAUX5UoVtIGss",
  authDomain: "employees-management-eef03.firebaseapp.com",
  projectId: "employees-management-eef03",
  storageBucket: "employees-management-eef03.firebasestorage.app",
  messagingSenderId: "324005070473",
  appId: "1:324005070473:web:79d2b62dc60e77ecba6858",
  measurementId: "G-6J4CTSCFKW"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
