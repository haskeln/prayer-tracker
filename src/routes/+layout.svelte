<script>
	import '../app.css';
	import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
	import { app, auth, setDBListener } from '../lib/firebase.js';
	import { onMount, setContext, tick } from 'svelte';
	import { browser } from '$app/environment';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from "flowbite-svelte";



	let { children } = $props();
	import { writable } from 'svelte/store';
  import AccountPopup from '$lib/AccountPopup.svelte';
  import Footer from '$lib/Footer.svelte';
  import { getPrayerTimes } from '$lib/prayer-times';
  import Clock from '$lib/Clock.svelte';
  import Location from '$lib/Location.svelte';
  import Drawer from '$lib/Drawer.svelte';
	let appState = $state({user : null, prayers: [], 
		prayerTimes: {
			fajr: '',
			dhuhr: '',
			asr: '',
			maghrib: '',
			isha: ''
		},
		summaryNDays: 7,
	});
	setContext('_app', appState);

		onMount(async () => {
		if (!browser) return;
		await tick();
		const unsubscribe = onAuthStateChanged(auth, async(firebaseUser) => {
			await getPrayerTimes(prayerTimes => {
				appState.prayerTimes = prayerTimes;
			});

			if(auth.currentUser === null) {
				appState.user = null;
				appState.prayers = [];
				return;
			}
			else{
				appState.user = firebaseUser;
				setDBListener((prayers) => {
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
			}
		});
		return unsubscribe;
	});

</script>
<main class="w-full max-w-lg">
<Clock/>
<Location/>
<Drawer/>

{@render children()}
</main>
<footer>
	<Footer/>
</footer>

