// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAHcddOOa5b9-7edWCyYsEXUJiqh9jQFnQ",
    authDomain: "e-commerce-15912.firebaseapp.com",
    projectId: "e-commerce-15912",
    storageBucket: "e-commerce-15912.appspot.com",
    messagingSenderId: "69520146739",
    appId: "1:69520146739:web:98dad409391a5bd9897e46"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const Storage = getStorage();