import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: process.env.REACT_APP_FB_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FB_PROJECTID,
  storageBucket: process.env.REACT_APP_FB_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FB_MESSAGINGSENDER_ID,
  appId: process.env.REACT_APP_FB_APPID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
