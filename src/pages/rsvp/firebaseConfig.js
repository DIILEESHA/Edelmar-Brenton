import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
 apiKey: "AIzaSyDmfqRC-HzdImh_GdDbKIJuKm9a2JKKHgk",
  authDomain: "jaslene-dad64.firebaseapp.com",
  projectId: "jaslene-dad64",
  storageBucket: "jaslene-dad64.firebasestorage.app",
  messagingSenderId: "943830398901",
  appId: "1:943830398901:web:1e0a498c87988274048bfc",
  measurementId: "G-QRDE680C9Q"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
