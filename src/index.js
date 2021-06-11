import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from "firebase/app"
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA4HVwpk44XGn9Bm3n2VOo-sUQgsl5_b3w",
    authDomain: "cart-61b88.firebaseapp.com",
    projectId: "cart-61b88",
    storageBucket: "cart-61b88.appspot.com",
    messagingSenderId: "673874206987",
    appId: "1:673874206987:web:58fdcc57c5db2ec2c7c20e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

ReactDOM.render(
    <App />,document.getElementById('root')
); 