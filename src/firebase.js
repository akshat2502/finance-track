import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCggjDevwkKpcnemGRhpgPaTljp4FhA4Z8",
  authDomain: "financial-tracker-f33a3.firebaseapp.com",
  projectId: "financial-tracker-f33a3",
  storageBucket: "financial-tracker-f33a3.appspot.com",
  messagingSenderId: "612000897115",
  appId: "1:612000897115:web:fd88c67d69e713ab52c77e",
  measurementId: "G-52S291KSFW"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };

// Initialize Firebase
const analytics = getAnalytics(app);