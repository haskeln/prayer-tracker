<script>
  import { auth, handleLogin } from "$lib/firebase";
  import Tracker from "$lib/Tracker.svelte";
  import { getContext } from "svelte";
  import { getAuth } from "firebase/auth";

  const appState = getContext('_app');
</script>
<h1>Welcome to Amalio, <a href="" onclick={() => {
  if (!getAuth().currentUser) {
    handleLogin();
  } 
}}>{appState.user? appState.user.displayName : "Please Login"}</a></h1>