import firebase from '@firebase/app'
import 'firebase/firestore'
require('firebase/auth')


const app =  firebase.initializeApp({
    apiKey: "AIzaSyCCuBjiI_7QwcbeFpgB4W1VzZgq8Vm7YdY",
    authDomain: "twitter-clone-7230a.firebaseapp.com",
    projectId: "twitter-clone-7230a",
    storageBucket: "twitter-clone-7230a.appspot.com",
    messagingSenderId: "568864652282",
    appId: "1:568864652282:web:6727efaaddee7e31f24243"
});

export const auth = firebase.auth();

const getFirestore = () => {
    return firebase.firestore(app)
}
export const db = getFirestore()
export const firebaseTweets = db.collection("tweets");
export const firebaseComments = db.collection("comments");
export const signInWithGoogle = async () => {

    const provider = new firebase.auth.GoogleAuthProvider();
    auth.useDeviceLanguage();
  
    try {
      await auth.signInWithPopup(provider)
    } catch (error) {
      console.error(error)
    }

  }