// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC2b7QB8d9f3Cg3o0cnZ9M2mbCSjm-lPao",
  authDomain: "in-journey360.firebaseapp.com",
  projectId: "in-journey360",
  storageBucket: "in-journey360.firebasestorage.app",
  messagingSenderId: "270710739000",
  appId: "1:270710739000:web:8a287e500c1ec6c68396cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;