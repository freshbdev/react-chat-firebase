import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBgpeJuvhmSP_l2oC9zx6aHan47UJmzRV0",
  authDomain: "react-chat-ea7cb.firebaseapp.com",
  projectId: "react-chat-ea7cb",
  storageBucket: "react-chat-ea7cb.appspot.com",
  messagingSenderId: "864008602183",
  appId: "1:864008602183:web:6b78ad55be4eb41022e762"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
export { db }