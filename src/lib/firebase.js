// src/lib/firebase.ts
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getFirestore, onSnapshot } from "firebase/firestore";


   	const firebaseConfig = {
	apiKey: "AIzaSyCJThvaRbUSaQy9OTgNuvyKRm-iy8fof1w",
	authDomain: "hiwidigi-main.firebaseapp.com",
	projectId: "hiwidigi-main",
	storageBucket: "hiwidigi-main.firebasestorage.app",
	messagingSenderId: "1092929504204",
	appId: "1:1092929504204:web:b2e2ed88dedfa69f661369",
	measurementId: "G-FDF0RSQNKB"
	};

// Avoid initializing more than once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

function setDBListener(userid, callback = ([])=> {}) {
onSnapshot(doc(getFirestore(), `amalio/main/users/${userid}/prayers/${new Date().toISOString().split('T')[0]}`), (snapshot) => {
    console.log("Current data: ", snapshot.data());
    callback(snapshot.data()?.prayers || []);
})
}


function handleLogin() {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider)
		.then((result) => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential.accessToken;
			// The signed-in user info.
			const user = result.user;
			// IdP data available using getAdditionalUserInfo(result)
			// ...
		}).catch((error) => {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			const email = error.customData.email;
			// The AuthCredential type that was used.
			const credential = GoogleAuthProvider.credentialFromError(error);
			// ...
		});
	}

async function writePrayer(uid, prayers){
    const docref = doc(getFirestore(), `amalio/main/users/${uid}/prayers/${new Date().toISOString().split('T')[0]}`);
    await setDoc(docref, {prayers: prayers}, {merge: true})
    return null;
}

export { app, auth, writePrayer, handleLogin, setDBListener };
