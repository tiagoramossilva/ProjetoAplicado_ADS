import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyArI0Ktq7N1JuaOZgR9i-ROXKDeUfe5HIs",
  authDomain: "pa-iii-3afc6.firebaseapp.com",
  projectId: "pa-iii-3afc6",
  storageBucket: "pa-iii-3afc6.appspot.com",
  messagingSenderId: "1060402143938",
  appId: "1:1060402143938:web:491256e3189e911425115b",
  measurementId: "G-FPVS84RW90"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
