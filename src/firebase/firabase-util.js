import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyD9rVPxNmGPn8MadWrXj9Y681oLPTnDZsQ",
  authDomain: "shop-82b8b.firebaseapp.com",
  databaseURL: "https://shop-82b8b.firebaseio.com",
  projectId: "shop-82b8b",
  storageBucket: "shop-82b8b.appspot.com",
  messagingSenderId: "1005492674564",
  appId: "1:1005492674564:web:4dec90ab47417d625ed551",
  measurementId: "G-F4ZG5RVC3F"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createUserProfile = async userAuth => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email, photoURL } = userAuth;

    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt
      });
    } catch (error) {}
  }

  return userRef;
};
