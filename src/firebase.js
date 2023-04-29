import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDzrOCl2prs01xxvHx-sKMSRtzAbdJjI1A",
  authDomain: "snapdeal-clone-46840.firebaseapp.com",
  projectId: "snapdeal-clone-46840",
  storageBucket: "snapdeal-clone-46840.appspot.com",
  messagingSenderId: "341860519199",
  appId: "1:341860519199:web:acf3c138e63b834aa8742a",
  measurementId: "G-E0NKN5F5ZF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();