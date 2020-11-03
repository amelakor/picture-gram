import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCXytBY2NOjd5mGQBqCVZS4HUCuGvufqws",
  authDomain: "picture-gram-6c512.firebaseapp.com",
  databaseURL: "https://picture-gram-6c512.firebaseio.com",
  projectId: "picture-gram-6c512",
  storageBucket: "picture-gram-6c512.appspot.com",
  messagingSenderId: "32833551138",
  appId: "1:32833551138:web:0d9a5705192e98564cc37b",
};

const firebaseStore = firebase.initializeApp(firebaseConfig);
const db = firebaseStore.firestore();
const auth = firebaseStore.auth();
const storage = firebaseStore.storage();

export { firebaseStore, db, auth, storage };
