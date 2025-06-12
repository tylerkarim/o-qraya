
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDfK9se9jBkijReY5zPQfxI6m0WT4iZIvM",
  authDomain: "qrayaaa-acffb.firebaseapp.com",
  projectId: "qrayaaa-acffb",
  storageBucket: "qrayaaa-acffb.firebasestorage.app",
  messagingSenderId: "568791705166",
  appId: "1:568791705166:web:4fc1d9c4fdc4b6f599c51f",
  measurementId: "G-TLS1T8NYNC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
