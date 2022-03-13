// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFCFbisub4oV1lZ0hZFecleEy6lMRpj6M",
  authDomain: "movie-app-rn-57133.firebaseapp.com",
  projectId: "movie-app-rn-57133",
  storageBucket: "movie-app-rn-57133.appspot.com",
  messagingSenderId: "130517786887",
  appId: "1:130517786887:web:a506d9dd208fd2970a25a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {app, db}