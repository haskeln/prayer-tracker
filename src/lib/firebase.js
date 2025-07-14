// src/lib/firebase.ts
import { goto } from '$app/navigation';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getFirestore, onSnapshot, collection, getDocs, sum } from "firebase/firestore";


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

function dbFormattedDate(){
    return new Date().toISOString().split('T')[0];
}

function dbTrackerRoute() {return `amalio/main/users/${auth.currentUser?.uid}/tracker/${dbFormattedDate()}`;}

function setDBListener(callback = ([], {})=> {}) {
    const unsubtracker = onSnapshot(doc(getFirestore(), dbTrackerRoute()), (snapshot) => {
        console.log("Current data: ", snapshot.data());
        callback(snapshot.data()?.prayers || [], snapshot.data()?.sunnah || {});
    })
    return unsubtracker;
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
            goto('/tracker/salah');
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

function handleLogout() {
    if(!confirm("Are you sure you want to log out?")) return;
    auth.signOut().then(() => {
        console.log("User signed out.");
        goto('/');
    }).catch((error) => {
        console.error("Sign out error:", error);
    });
}

async function writePrayer(prayers){
    const docref = doc(getFirestore(), dbTrackerRoute());
    await setDoc(docref, {prayers: prayers}, {merge: true})
    return null;
}

async function writeSunnah(sunnah){
    const docref = doc(getFirestore(), dbTrackerRoute());
    await setDoc(docref, {sunnah: sunnah}, {merge: true})
    return null;
}

async function loadSummary(nDays) {
    const db = getFirestore();
    const colRef = collection(db, `amalio/main/users/${auth.currentUser?.uid}/tracker`);

    const prayerSummary = [];
    const sunnahSummary = [];
    const quranSummary = [];

    const docsSnap = await getDocs(colRef);
    docsSnap.forEach(doc => {
        prayerSummary.push(doc.data().prayers || []);
        sunnahSummary.push(doc.data().sunnah || []);
        quranSummary.push(doc.data().quran || []);  
    })

    //clean summary days, very general, need to be fixed
    if(nDays == 1){
        const deleteN = prayerSummary.length - 2;
        const n_prayerSummary = [];
        if(deleteN > 0) {
            prayerSummary.splice(0, deleteN);
        }
        if(prayerSummary.length >1) {
            n_prayerSummary.push(prayerSummary[0]);
        }
        console.log("n_prayerSummary", n_prayerSummary);
        return {prayerSummary : n_prayerSummary, sunnahSummary, quranSummary}
    }
    if(nDays == 0) {
        nDays = 1;
    }
    const deleteN = prayerSummary.length - nDays;
        if(deleteN > 0) {
            prayerSummary.splice(0, deleteN);
        }
    
    return {prayerSummary, sunnahSummary, quranSummary}
}

export { app, auth, writePrayer, handleLogin, setDBListener, handleLogout, loadSummary, writeSunnah };
