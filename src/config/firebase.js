import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import { getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAJ0NCl0-HLx9GgB7PMktN3yPJ0yhGtObs",
  authDomain: "certification-6cf54.firebaseapp.com",
  projectId: "certification-6cf54",
  storageBucket: "certification-6cf54.firebasestorage.app",
  messagingSenderId: "954433331706",
  appId: "1:954433331706:web:9f8846eaba0eebf3354443",
  measurementId: "G-M1PPL83SE4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);

export const db = getFirestore(app);