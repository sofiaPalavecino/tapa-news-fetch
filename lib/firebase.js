// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { } from "dotenv/config";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const {
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID,
} = process.env

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);

let app;
let firestoreDb;

const initializeFirebaseApp = () => {
    try{
        app = initializeApp(firebaseConfig);
        firestoreDb = getFirestore();
    } catch (error) {
        console.log(error)
    }
}

const uploadProcessedData = async () => {
    const dataToUpload = {
        key1: "test",
        key2: 123,
        key3: new Date()
    };

    try{
        const document = doc(firestoreDb, "news", "unique-id-2");
        let dataUpdated = await setDoc(document, dataToUpload);
        return dataUpdated;
    }catch (error) {
        console.log(error)
    }
}

const getFirebaseApp = () => app;

export {
    initializeFirebaseApp,
    getFirebaseApp,
    uploadProcessedData
}