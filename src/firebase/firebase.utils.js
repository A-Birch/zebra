import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAX6T_CRp19CF8q4VcfIRLrgJA3YUplC0g",
    authDomain: "zebra-shop.firebaseapp.com",
    databaseURL: "https://zebra-shop.firebaseio.com",
    projectId: "zebra-shop",
    storageBucket: "zebra-shop.appspot.com",
    messagingSenderId: "1082968991867",
    appId: "1:1082968991867:web:1abd06c9c9c38091039ade",
    measurementId: "G-F2TFVVV7D1"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Google authentication
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;