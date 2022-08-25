
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcNQpyXNN1BbMiYCKrrhZ-jXVrnmXR66U",
  authDomain: "post-caf5f.firebaseapp.com",
  projectId: "post-caf5f",
  storageBucket: "post-caf5f.appspot.com",
  messagingSenderId: "760763102570",
  appId: "1:760763102570:web:d063502a65ccd7b277a113",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const storage = getStorage(app)
export { db, storage };
