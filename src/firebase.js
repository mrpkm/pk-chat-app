import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVpmOQ_MjeOrrYU0xXLLA-9f21ah2BjnY",
  authDomain: "whatapps-784f4.firebaseapp.com",
  databaseURL: "https://whatapps-784f4-default-rtdb.firebaseio.com",
  projectId: "whatapps-784f4",
  storageBucket: "whatapps-784f4.appspot.com",
  messagingSenderId: "555253403787",
  appId: "1:555253403787:web:431f7431826c87b5cb448e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
