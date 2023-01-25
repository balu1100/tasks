import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCxAica57EK5jxad_3xWN5STsQZR4CdfIA",
    authDomain: "tasks-e515a.firebaseapp.com",
    projectId: "tasks-e515a",
    storageBucket: "tasks-e515a.appspot.com",
    messagingSenderId: "636887418700",
    appId: "1:636887418700:web:de67448dcd85b09510f1e9"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const auth = getAuth(app);
export { database, auth };
export default app;
