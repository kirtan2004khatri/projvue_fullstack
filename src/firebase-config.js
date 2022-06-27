import {initializeApp} from 'firebase/app';
import {getFirestore,collection} from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyD9RkWnjw7C3kf6o9dYI_p3jhdm_DLtKd0",
    authDomain: "proj-mgmt-app.firebaseapp.com",
    projectId: "proj-mgmt-app",
    storageBucket: "proj-mgmt-app.appspot.com",
    messagingSenderId: "527082093112",
    appId: "1:527082093112:web:be65dbd4feca908598c4cd"
  };
initializeApp(firebaseConfig);
const db=getFirestore();
const colRef=collection(db,'projects');

export {db,colRef}