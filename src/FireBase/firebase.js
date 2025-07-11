import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyAsmIe3LqhqfWZ2D6Vwl-h08kasS2dWju0",
  authDomain: "swp391-group1.firebaseapp.com",
  projectId: "swp391-group1",
  storageBucket: "swp391-group1.appspot.com",
  messagingSenderId: "952206662709",
  appId: "1:952206662709:web:5cfff737e0264cf876657c",
  measurementId: "G-MHDZJDG04M",
};

// Khởi tạo Firebase App
const app = initializeApp(firebaseConfig);

// Khởi tạo Auth và Google Provider
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

//  Khởi tạo Firestore
const db = getFirestore(app);

export { auth, googleProvider, db };
