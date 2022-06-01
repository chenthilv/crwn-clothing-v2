// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmA4pbWvcG294XIIlPj8nKtyM6Q-b5qhc",
  authDomain: "crwn-clothing-db-ec7df.firebaseapp.com",
  projectId: "crwn-clothing-db-ec7df",
  storageBucket: "crwn-clothing-db-ec7df.appspot.com",
  messagingSenderId: "1045376243334",
  appId: "1:1045376243334:web:1001e8e269f6599789a307"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log('userDocRef : ', userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log('userSnapshot : ', userSnapshot);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        await setDoc(userDocRef, {
            displayName,
            email,
            createdAt
        });
    }
    return userDocRef;

}