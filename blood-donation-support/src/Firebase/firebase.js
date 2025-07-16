import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyDzQRePwPOBlo3QzhXgF3-pHbXpHUSlJvA",
  authDomain: "blooddonationsystem-e6cf9.firebaseapp.com",
  projectId: "blooddonationsystem-e6cf9",
  storageBucket: "blooddonationsystem-e6cf9.firebasestorage.app",
  messagingSenderId: "417075665786",
  appId: "1:417075665786:web:21de2419bf2f0367df54c3",
  measurementId: "G-VE6LLRLMSH"
};

// Khởi tạo Firebase App
const app = initializeApp(firebaseConfig);

// Khởi tạo Auth và Google Provider
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

//  Khởi tạo Firestore
const db = getFirestore(app);

export { auth, googleProvider, db };
