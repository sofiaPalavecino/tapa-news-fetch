// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase-admin/app";
import { getFirestore, doc, setDoc, collection, getDocs } from "firebase/firestore";
import { } from "dotenv/config";
import admin from 'firebase-admin';
import serviceAccount from "./service_accounts/tapa-517de-firebase-adminsdk-jr7v8-967d7f6be6.json" assert { type: "json" };

let app;
let firestoreDb;

const initializeFirebaseApp = () => {
    try{
        app = admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        firestoreDb = admin.firestore();
    } catch (error) {
        console.log("aaaa")
        console.log(error)
    }
}

const uploadProcessedData = async (dataToUpload) => {
    try{
        const document = firestoreDb.collection("news").doc(dataToUpload.id);
        let dataUpdated = await document.set(dataToUpload);
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