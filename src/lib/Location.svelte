<script>
  import { onMount, tick } from "svelte";
  import { reverseGeocode } from "./geocode";

  let location = $state("")

onMount(async ()=>{
    await tick()
    location = "Loading location..."
    setTimeout(async() => {
        reverseGeocode(({city, country} ) => location = `${city}, ${country}` )
    }, 1000)
    console.log("Location:", location)
})
</script>
<div class="text-2xl text-center mb-4">📍 {location}</div>