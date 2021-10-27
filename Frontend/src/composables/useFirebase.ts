import { initializeApp, FirebaseOptions, FirebaseApp } from 'firebase/app'
import { Auth, browserLocalPersistence,createUserWithEmailAndPassword, getAuth, setPersistence, signInWithEmailAndPassword, signOut, User } from 'firebase/auth'

const firebaseConfig:FirebaseOptions = {
    apiKey: "AIzaSyDL9CZAEQy8dWqXTS_A6pGLDOApTU1kl7M",
    authDomain: "express-server-auth-5455e.firebaseapp.com",
    projectId: "express-server-auth-5455e",
    storageBucket: "express-server-auth-5455e.appspot.com",
    messagingSenderId: "560074154452",
    appId: "1:560074154452:web:00f9c5c307c4d6da35f641"
}

const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth();