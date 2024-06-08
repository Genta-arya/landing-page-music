import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"; // Import getStorage untuk Firebase Storage

const firebaseConfig = {
  apiKey: "AIzaSyD9b8WKLuC8EAAYO9PheAKQDcjHTcn-0TY",
  authDomain: "orgen-tunggal-4b8ab.firebaseapp.com",
  projectId: "orgen-tunggal-4b8ab",
  storageBucket: "orgen-tunggal-4b8ab.appspot.com",
  messagingSenderId: "384323405103",
  appId: "1:384323405103:web:788c1837aec6d78294cdda",
  measurementId: "G-BJ5EL1ETFF",
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const storage = getStorage(app); // Inisialisasi Firebase Storage
export { db, auth, analytics, storage }; // Export storage
