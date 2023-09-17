// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"
import { getAnalytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuXJPxFSJ76Cq0_bLZ2SPwWqyNbW9P9j0",
  authDomain: "bicycle-d13d7.firebaseapp.com",
  projectId: "bicycle-d13d7",
  storageBucket: "bicycle-d13d7.appspot.com",
  messagingSenderId: "177363978819",
  appId: "1:177363978819:web:a16e333e7d7b482ac4a2f6",
  measurementId: "G-4BKRDZB7YB",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
export const db = getFirestore(app)
// export const auth = getAuth(app)
// export const analytics = getAnalytics(app)
