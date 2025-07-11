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
  import { getPrayerTimes } from '$lib/prayer-times';
	let appState = $state({user : null, prayers: [], 
		prayerTimes: {
			fajr: '',
			dhuhr: '',
			asr: '',
			maghrib: '',
			isha: ''
		}
	});
	setContext('_app', appState);

		onMount(async () => {
		if (!browser) return;
		await tick();
		const unsubscribe = onAuthStateChanged(auth, async(firebaseUser) => {
			appState.user = firebaseUser;
			setDBListener(firebaseUser.uid, (prayers) => {
				if (prayers.length > 0) {
					appState.prayers = prayers;
				} else {
					appState.prayers = [{name: 'Fajr', status: '', rawatib: { qabliyah: false, baadiyah: false }},
					{name: 'Dhuhr', status: '', rawatib: { qabliyah: false, baadiyah: false }},
					{name: 'Asr', status: '', rawatib: { qabliyah: false, baadiyah: false }},
					{name: 'Maghrib', status: '', rawatib: { qabliyah: false, baadiyah: false }},
					{name: 'Isha', status: '', rawatib: { qabliyah: false, baadiyah: false }}];
				}
			});
			appState.prayerTimes = await getPrayerTimes()
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

