import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
 apiKey: "AIzaSyCyATA52SCf0_YM-lV-HCKK_Lv6GNDwJYY",
  authDomain: "brenton-8eec9.firebaseapp.com",
  projectId: "brenton-8eec9",
  storageBucket: "brenton-8eec9.firebasestorage.app",
  messagingSenderId: "397927246465",
  appId: "1:397927246465:web:607005ec55bb9962673b80",
  measurementId: "G-YJYD65C6TV"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
