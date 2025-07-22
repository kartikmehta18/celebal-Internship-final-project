
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB0bz5OFEtNkhRZzn6qeWGrZTjiWddGnmE",
  authDomain: "studybudy-37a66.firebaseapp.com",
  projectId: "studybudy-37a66",
  storageBucket: "studybudy-37a66.firebasestorage.app",
  messagingSenderId: "728482955285",
  appId: "1:728482955285:web:ee0369ba07db3acf1e4e1c",
  measurementId: "G-EKFTDELND9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (only in production)
let analytics;
if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
  analytics = getAnalytics(app);
}

// Initialize Auth
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);

// Configure Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export default app;
