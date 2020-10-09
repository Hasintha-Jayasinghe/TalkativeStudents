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

export const uploadImg = async (uri: string, userId: string) => {
  const response = await fetch(uri);
  const blob = await response.blob();

  const randInt = Math.floor(Math.random() * 450);

  const snapshot = await firebase
    .storage()
    .ref()
    .child('profilePics')
    .child(String(userId))
    .child('img.jpg')
    .put(blob);

  return await storage
    .ref('profilePics/' + String(userId) + '/img.jpg')
    .getDownloadURL();
};

export { db, auth, storage };
