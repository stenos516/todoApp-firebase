import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAnjXJ_6cOeJf7i0yYhWumMYt8nlth67A4",
  authDomain: "minions-pern-app.firebaseapp.com",
  projectId: "minions-pern-app",
  storageBucket: "minions-pern-app.firebasestorage.app",
  messagingSenderId: "640137560914",
  appId: "1:640137560914:web:35fe8ef0a92b570fea308b",
  measurementId: "G-PWEGBVG6YC"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export {db, auth, analytics};