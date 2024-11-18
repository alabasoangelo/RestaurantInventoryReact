import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDHDbfmoI1qeLqYo8nUmfAgC511l2BtyJM",
  authDomain: "restaurantinventorysyste-53c12.firebaseapp.com",
  projectId: "restaurantinventorysyste-53c12",
  storageBucket: "restaurantinventorysyste-53c12.firebasestorage.app",
  messagingSenderId: "983141713892",
  appId: "1:983141713892:web:786b9aa7fc8b059429e9f1",
  measurementId: "G-F6GERPG2BH"
};

  initializeApp(firebaseConfig);

const db = getFirestore();

const auth = getAuth();

export {db, auth}