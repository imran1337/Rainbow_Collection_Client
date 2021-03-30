import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
});


export const auth = app.auth();
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();

export const socialMediaLogin = async (providerName, setError, redirect) => {
    try {
      await auth.signInWithPopup(providerName);
      await redirect()
    } catch (error) {
      const err = await error;
      const errCode = err.code;
      const errMsg = err.message;
      setError({
        isError: true,
        errCode,
        errMsg,
      });
      console.log(err);
    }
  };
  
  export const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      const err = await error;
      console.log(err);
    }
  };