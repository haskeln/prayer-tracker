<script>
	import '../app.css';
	import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
	import { app, auth, setDBListener } from '../lib/firebase.js';
	import { onMount, setContext, tick } from 'svelte';
	import { browser } from '$app/environment';


	let { children } = $props();
	import { writable } from 'svelte/store';
  import AccountPopup from '$lib/AccountPopup.svelte';
  import Footer from '$lib/Footer.svelte';
	let appState = $state({user : null});
	setContext('_app', appState);

		onMount(async () => {
		if (!browser) return;
		await tick();
		const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
			appState.user = firebaseUser;
			setDBListener(firebaseUser.uid, prayers => {
				if (prayers.length > 0) {
					appState.prayers = prayers;
				} else {
					appState.prayers = [];
				}
			});
		});
		return unsubscribe;
	});

	//TODO: add the default prayers list
</script>
<main>
<h1>Welcome to Amalio, <AccountPopup/></h1>

{@render children()}
</main>
<footer>
	<Footer/>
</footer>

