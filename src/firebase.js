import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore/lite";

const firebaseConfig = {
    apiKey: "AIzaSyCnuCQU7NgHk-PBUHnfzgjmfA1u7mUJIwk",
    authDomain: "todolist-cdec4.firebaseapp.com",
    projectId: "todolist-cdec4",
    storageBucket: "todolist-cdec4.appspot.com",
    messagingSenderId: "194692993791",
    appId: "1:194692993791:web:7d992d3026edd54c4d72ca"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);