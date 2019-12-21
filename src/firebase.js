import firebase from "firebase";


var firebaseConfig = {
    apiKey: "AIzaSyDHKWBbEgLOVH3lorwEEF8_2jA1I9KA3vE",
    authDomain: "ecommreact.firebaseapp.com",
    databaseURL: "https://ecommreact.firebaseio.com",
    projectId: "ecommreact",
    storageBucket: "ecommreact.appspot.com",
    messagingSenderId: "204294439161",
    appId: "1:204294439161:web:c589a664be6660b0bd2228",
    measurementId: "G-CWTVX8DH0T"
  };

  firebase.initializeApp(firebaseConfig);
  export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
  export default firebase;  