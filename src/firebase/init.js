// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGQYmnQa8YPev_dXHSplfOg7Xt_l9Oh7E",
  authDomain: "week7-57f18.firebaseapp.com",
  projectId: "week7-57f18",
  storageBucket: "week7-57f18.firebasestorage.app",
  messagingSenderId: "815543868527",
  appId: "1:815543868527:web:05b959eb513b1d96cc019a"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore()
export default db