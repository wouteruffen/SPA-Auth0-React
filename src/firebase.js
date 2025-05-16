import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUOjxYSd8cvsqUKEs5d1axNOxGsBOO9t4",
  authDomain: "auth0-37160.firebaseapp.com",
  projectId: "auth0-37160",
  storageBucket: "auth0-37160.firebasestorage.app",
  messagingSenderId: "646364922883",
  appId: "1:646364922883:web:27e6875dfed9e15dd3ba36"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
