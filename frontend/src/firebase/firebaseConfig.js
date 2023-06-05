import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBplHXtSDyQI48ZRXiQ79Cz68lb76ZqKFA",
  authDomain: "ticktocktreasure-53e48.firebaseapp.com",
  projectId: "ticktocktreasure-53e48",
  storageBucket: "ticktocktreasure-53e48.appspot.com",
  messagingSenderId: "25508972169",
  appId: "1:25508972169:web:1b1b3ded60af7a225f6858",
  measurementId: "G-WEFNF682FH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app;
