<script>
  import { auth } from "$lib/firebase";
  import Tracker from "$lib/Tracker.svelte";
  import { getContext } from "svelte";

  const appState = getContext('_app');
</script>
<h1>Welcome to SvelteKit {appState.user? appState.user.email: "No email"}</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<Tracker/>
