// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "bfast-dashboard.firebaseapp.com",
  projectId: "bfast-dashboard",
  storageBucket: "bfast-dashboard.appspot.com",
  messagingSenderId: "285348398227",
  appId: "1:285348398227:web:515f08939cd36591e0b966"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export { app };