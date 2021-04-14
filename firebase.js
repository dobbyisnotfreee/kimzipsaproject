import * as firebase from 'firebase'
import "firebase/auth";
import "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyBJbMah_aH5XLESyaNPx24dAm_-uSwqLyc",
    authDomain: "kimzipsa-ea07c.firebaseapp.com",
    projectId: "kimzipsa-ea07c",
    storageBucket: "kimzipsa-ea07c.appspot.com",
    messagingSenderId: "474924651506",
    appId: "1:474924651506:web:703dd59b028c4be96d516b",
    measurementId: "G-YC9LXVFD0G"
};

let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
