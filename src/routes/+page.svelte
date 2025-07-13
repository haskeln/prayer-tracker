<script>
  import { auth, handleLogin } from "$lib/firebase";
  import Tracker from "$lib/Tracker.svelte";
  import { getContext } from "svelte";
  import { getAuth } from "firebase/auth";
  import { Card } from "flowbite-svelte";

  const appState = getContext('_app');
</script>
<h1 class="text-center">Welcome to Amalio, <a href="" onclick={() => {
  if (!getAuth().currentUser) {
    handleLogin();
  } 
}}>{appState.user? appState.user.displayName : "Please Login"}</a></h1>
<Card class="max-w-3xl mx-auto my-4 p-4 bg-gray-100 dark:bg-gray-800">
  <div class="m-4">
    <p>see what you can do with Amalio:</p>
    <ul class="list-disc pl-5">
      <li><a href="/tracker/salah">Track your prayers</a></li>
      <li><a href="/tracker/salah">View prayer times</a></li>
      <li>Manage your account</li>
    </ul>
</div>
</Card>