// src/firebase/config.ts
import { initializeApp, getApps } from "firebase/app";
import {getAuth} from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyCX-_E0vud214A7iHELydGAFQiR3JUe2dc",
  authDomain: "nextjsapp-f9fd8.firebaseapp.com",
  projectId: "nextjsapp-f9fd8",
  storageBucket: "nextjsapp-f9fd8.appspot.com",
  messagingSenderId: "372956064809",
  appId: "1:372956064809:web:acf8ae54acfc80d69a0038"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

export { app, auth };

