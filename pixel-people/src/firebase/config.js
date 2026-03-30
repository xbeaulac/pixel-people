import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: process.env.VUE_APP_FIRE_apiKey,
//   authDomain: process.env.VUE_APP_FIRE_authDomain,
//   projectId: process.env.VUE_APP_FIRE_projectId,
//   storageBucket: process.env.VUE_APP_FIRE_storageBucket,
//   messagingSenderId: process.env.VUE_APP_FIRE_messagingSenderId,
//   appId: process.env.VUE_APP_FIRE_appId,
//   measurementId: process.env.VUE_APP_FIRE_measurementId,
// };

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwfpM6QmuKXbxo0lZY_Zc9PSQ_BB9CiAU",
  authDomain: "dev-pixel-people.firebaseapp.com",
  projectId: "dev-pixel-people",
  storageBucket: "dev-pixel-people.appspot.com",
  messagingSenderId: "782109182933",
  appId: "1:782109182933:web:db3266fbf4cc3411158b5c",
  measurementId: "G-6TPQHCW9P8",
};

// init firebase
initializeApp(firebaseConfig);

//init services
const db = getFirestore();
const st = getStorage();
const auth = getAuth();
const func = getFunctions();

// init emulators (for localhost only)
if (location.hostname === "localhost") {
  connectFirestoreEmulator(db, "localhost", 8090);
  connectStorageEmulator(st, "localhost", 9199);
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFunctionsEmulator(func, "localhost", 5001);
}

export { db, st, auth, func };
