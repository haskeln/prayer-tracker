<script>
  import { auth } from "$lib/firebase";
  import Tracker from "$lib/Tracker.svelte";
  import { getContext } from "svelte";

  const appState = getContext('_app');
</script>
<Tracker/>
