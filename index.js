import { AppRegistry } from 'react-native';
import App from './App';
import firebase from 'firebase';

  var config = {
    apiKey: "AIzaSyA2G8exipAScw4qowOKoE5DF2Z3pzKyT1s",
    authDomain: "mymoney-340aa.firebaseapp.com",
    databaseURL: "https://mymoney-340aa.firebaseio.com",
    projectId: "mymoney-340aa",
    storageBucket: "mymoney-340aa.appspot.com",
    messagingSenderId: "105934374982",
    timestampsInSnapshots: true,
  };
  firebase.initializeApp(config);

AppRegistry.registerComponent('MyMoney', () => App);
