<script>
  import Watcher from "$lib/Watcher.svelte";
  let {children} = $props();

</script>
{@render children()}
<Watcher/>