<script>
    import {getContext, onMount} from "svelte";
  import { isBefore } from "./time-comparer";

    const appState = getContext('_app');
    let time = $state(new Date().toLocaleString());
    function updateClock() {
        const now = new Date();
        time = now.toLocaleString();
        Object.keys(appState.timeLock).forEach(key => {
            if(appState.prayerTimes[key]) appState.timeLock[key] = isBefore(time.split(",")[1], appState.prayerTimes[key]);
        });
    }

    setInterval(updateClock, 1000);
    updateClock();
</script>

<div class="text-2xl font-bold text-center">{time.split(',')[0]}</div>
<div class="text-4xl font-bold mb-4 text-center"><a>{time.split(',')[1]}</a></div>