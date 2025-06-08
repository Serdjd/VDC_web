const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");

const firebaseConfig = {
  apiKey: "AIzaSyD_KenG-8pDarXynnNpqvciEW9HwXiKF-0",
  authDomain: "vdc-web-5b437.firebaseapp.com",
  projectId: "vdc-web-5b437",
  storageBucket: "vdc-web-5b437.firebasestorage.app",
  messagingSenderId: "43257263889",
  appId: "1:43257263889:web:bef6e5fe3f3071546efeb0",
  measurementId: "G-W2Q6YJMMPB"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);