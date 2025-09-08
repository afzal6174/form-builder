// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const appleProvider = new OAuthProvider("apple.com");

const signInWithOauth = async (provider: "google" | "apple") => {
  let providerInstance;
  switch (provider) {
    case "google":
      providerInstance = googleProvider;
      break;
    case "apple":
      providerInstance = appleProvider;
      break;
    default:
      throw new Error("Unsupported provider");
  }
  try {
    const res = await signInWithPopup(auth, providerInstance);
    const user = res.user;
    return user;
  } catch (error) {
    throw error;
  }
};

const signOut = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    throw error;
  }
};

const useAuth = () => {
  const [user, loading, error] = useAuthState(auth);
  return { user, loading, error };
};

export { signInWithOauth, signOut, useAuth };
