// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAGlR0l31CrNycPEWU8iEiGCt4gMCVa2uI',
  authDomain: 'fir-auth-9b34f.firebaseapp.com',
  projectId: 'fir-auth-9b34f',
  storageBucket: 'fir-auth-9b34f.appspot.com',
  messagingSenderId: '225748931730',
  appId: '1:225748931730:web:f628bcff74d711eb44824b',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
