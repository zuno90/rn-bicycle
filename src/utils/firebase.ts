// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"
import env from "../../app.json"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: env.apiKey,
  authDomain: env.authDomain,
  projectId: env.projectId,
  storageBucket: env.storageBucket,
  messagingSenderId: env.messagingSenderId,
  appId: env.appId,
  measurementId: env.measurementId,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
export const db = getFirestore(app)
// export const auth = getAuth(app)
// export const analytics = getAnalytics(app)
