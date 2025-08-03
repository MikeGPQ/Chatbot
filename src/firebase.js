import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from 'firebase/firestore';
import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";


const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};



export const app = initializeApp(firebaseConfig);
const ai = getAI(app, { backend: new GoogleAIBackend() });
export const auth = getAuth(app);
export const db = getFirestore(app);
export const model = getGenerativeModel(ai, { model: "gemini-2.5-flash" });
