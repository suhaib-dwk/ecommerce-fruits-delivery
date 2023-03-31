import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCsqZhyJ3DVq6MidUORTgNVJndXIex5OtU",
    authDomain: "food-delivery-50ddf.firebaseapp.com",
    databaseURL: "https://food-delivery-50ddf-default-rtdb.firebaseio.com",
    projectId: "food-delivery-50ddf",
    storageBucket: "food-delivery-50ddf.appspot.com",
    messagingSenderId: "953700935306",
    appId: "1:953700935306:web:dbeefa029bb0f740452f73",
    measurementId: "G-7LVPDF9DKL"
};


const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig)

const firestore = getFirestore(app)
const storage = getStorage(app)

export { app, firestore, storage } 