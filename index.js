/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import firebase from '@react-native-firebase/app';
var firebaseConfig = {
  apiKey: 'AIzaSyCp5BQZXtKiEFwNMtKK3MSt-H7Trh8OOPE',
  authDomain: 'hm-eatry.firebaseapp.com',
  databaseURL: 'https://hm-eatry-default-rtdb.firebaseio.com',
  projectId: 'hm-eatry',
  storageBucket: 'hm-eatry.appspot.com',
  messagingSenderId: '304724658168',
  appId: '1:304724658168:web:c878834ed85952d0d8b80d',
  measurementId: 'G-0D709K6JM4',
};
// firebaseConfig = {
//   apiKey: 'AIzaSyDyY3QKC2RcV9aZhG1YmfUK9ns6yZk-kCo',
//   authDomain: 'test-restaurant-71d3f.firebaseapp.com',
//   databaseURL: 'https://test-restaurant-71d3f-default-rtdb.firebaseio.com',
//   projectId: 'test-restaurant-71d3f',
//   storageBucket: 'test-restaurant-71d3f.appspot.com',
//   messagingSenderId: '348993693297',
//   appId: '1:348993693297:web:6f6bb121475b91893e1dd0',
//   measurementId: 'G-ZXLJ1YK08E',
// };
firebase.initializeApp(firebaseConfig);
AppRegistry.registerComponent(appName, () => App);
