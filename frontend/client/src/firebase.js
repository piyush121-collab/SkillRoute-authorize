// src/firebaseConfig.js
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyCeeoZ2bd56vcfkyU1fPtN9Oe46U4qJPGc",
//   authDomain: "skillroute-1c12a.firebaseapp.com",
//   projectId: "skillroute-1c12a",
//   storageBucket: "skillroute-1c12a.firebasestorage.app",
//   messagingSenderId: "61181846018",
//   appId: "1:61181846018:web:2e75225f977ade81ca7d1b",
//   measurementId: "G-CWY4L5BMC9",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// export { auth, app };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAe_tq1yxbhBzYVTO2fJvehztYCOI47WFg",
  authDomain: "skillroute-authorize.firebaseapp.com",
  projectId: "skillroute-authorize",
  storageBucket: "skillroute-authorize.firebasestorage.app",
  messagingSenderId: "925530836824",
  appId: "1:925530836824:web:cb5cee7a143c75a4509f2d",
  measurementId: "G-G5CCSGXZV6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, app };

