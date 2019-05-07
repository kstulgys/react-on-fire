import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCntqlGcBGFpmsBPzixpDMmpcligLilY50",
  authDomain: "fire-chat-63776.firebaseapp.com",
  databaseURL: "https://fire-chat-63776.firebaseio.com",
  projectId: "fire-chat-63776",
  storageBucket: "fire-chat-63776.appspot.com",
  messagingSenderId: "744748768608",
  appId: "1:744748768608:web:0cc5accb2c0b5810"
};
firebase.initializeApp(config);

const db = firebase.firestore();
const rtdb = firebase.database();

export function setupPresence(user) {
  const isOfflineForRTDB = {
    state: 'offline',
    lastChanged: firebase.database.ServerValue.TIMESTAMP,
  };

  const isOnlineforRTDB = {
    state: 'online',
    lastChanged: firebase.database.ServerValue.TIMESTAMP,
  };

  const isOfflineForFirestore = {
    state: 'offline',
    lastChanged: firebase.firestore.FieldValue.serverTimestamp(),
  };

  const isOnlineforFirestore = {
    state: 'online',
    lastChanged: firebase.firestore.FieldValue.serverTimestamp(),
  };

  const rtdbRef = rtdb.ref(`/status/${user.uid}`);
  const userDoc = db.doc(`users/${user.uid}`);

  rtdb.ref('.info/connected').on('value', async snapshot => {
    if (snapshot.val() === false) {
      userDoc.update({
        status: isOfflineForFirestore,
      });
      return;
    }

    await rtdbRef.onDisconnect().set(isOfflineForRTDB);
    rtdbRef.set(isOnlineforRTDB);
    userDoc.update({
      status: isOnlineforFirestore,
    });
  });
}

export { db, firebase };
