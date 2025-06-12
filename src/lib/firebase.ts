
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBTruG0m2017P2PIwaW6-3JbX5766RiTDU",
  authDomain: "qrayadatabase.firebaseapp.com",
  projectId: "qrayadatabase",
  storageBucket: "qrayadatabase.firebasestorage.app",
  messagingSenderId: "695210442595",
  appId: "1:695210442595:web:db18d84c6dd20737a55d56",
  measurementId: "G-9GZQNVG2GG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
