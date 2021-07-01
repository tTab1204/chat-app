import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
let firebaseConfig = {
  apiKey: 'AIzaSyAE-H5lrCu_N-kQm2Ls3AGiGzNFs4S0VJU',
  authDomain: 'chat-app-1ebc5.firebaseapp.com',
  projectId: 'chat-app-1ebc5',
  storageBucket: 'chat-app-1ebc5.appspot.com',
  messagingSenderId: '355809098660',
  appId: '1:355809098660:web:74a76e36881d8c4fdadf31',
  measurementId: 'G-DE03LC1V0Y',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export default firebase;
