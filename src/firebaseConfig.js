// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEhrZ87XpwtptcN-YW8g6VeEVeadntpO8",
  authDomain: "student-attendance-syste-8982b.firebaseapp.com",
  projectId: "student-attendance-syste-8982b",
  storageBucket: "student-attendance-syste-8982b.appspot.com",
  messagingSenderId: "840713700701",
  appId: "1:840713700701:web:94e71dd90d42d94f7a94b4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth};
export {db};
