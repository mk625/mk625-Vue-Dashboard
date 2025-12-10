
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCimFL-JRiKVVEnutqGS7JgFDIrtoYpP3s",
    authDomain: "react-dashboard-16f78.firebaseapp.com",
    projectId: "react-dashboard-16f78",
    storageBucket: "react-dashboard-16f78.firebasestorage.app",
    messagingSenderId: "611213212394",
    appId: "1:611213212394:web:b10f924f52376579ddf593",
    measurementId: "G-Z1L5KSSL0V"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
