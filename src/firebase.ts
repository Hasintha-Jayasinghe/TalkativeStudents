import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBm1-s1H44JdFpKxQIv_MYUznlIvL47nC8',
  authDomain: 'talkative-students.firebaseapp.com',
  databaseURL: 'https://talkative-students.firebaseio.com',
  projectId: 'talkative-students',
  storageBucket: 'talkative-students.appspot.com',
  messagingSenderId: '981588369195',
  appId: '1:981588369195:web:6987a8123497873bc6ef6e',
  measurementId: 'G-K16PJX9PNP',
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
