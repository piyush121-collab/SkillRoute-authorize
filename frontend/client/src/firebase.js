// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCeeoZ2bd56vcfkyU1fPtN9Oe46U4qJPGc",
  authDomain: "skillroute-1c12a.firebaseapp.com",
  projectId: "skillroute-1c12a",
  storageBucket: "skillroute-1c12a.firebasestorage.app",
  messagingSenderId: "61181846018",
  appId: "1:61181846018:web:2e75225f977ade81ca7d1b",
  measurementId: "G-CWY4L5BMC9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth,app };
