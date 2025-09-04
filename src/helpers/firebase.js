import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBOAK9M6cu-8tYdBw_LFkJPa8f3BOHoJ6A",
    authDomain: "my-homepage-157fb.firebaseapp.com",
    projectId: "my-homepage-157fb",
    storageBucket: "my-homepage-157fb.appspot.com",
    messagingSenderId: "596842962168",
    appId: "1:596842962168:web:036cd1889c2a1af1f46f0d",
    measurementId: "G-612ZCHWDZT",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getDatabase(app);
export const firestore = getFirestore(app);
