
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDCwIrJOy1Q3Epx8wFIME-L2Ke6C6Y3Mvg",
  authDomain: "maxlence-a4b3a.firebaseapp.com",
  projectId: "maxlence-a4b3a",
  storageBucket: "maxlence-a4b3a.appspot.com",
  messagingSenderId: "87536385154",
  appId: "1:87536385154:web:8d96794ab1aa384ddb889b",
  measurementId: "G-56SDXSWJQF"
};

const app = initializeApp(firebaseConfig);
const auth =getAuth();
export {app,auth};