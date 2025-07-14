<script>
  import { writable } from 'svelte/store';
  import { app, writePrayer } from './firebase';
  import { getContext } from 'svelte';
  import { Dialog } from 'bits-ui';
  import {fade, fly} from 'svelte/transition';
  import {Card} from 'flowbite-svelte';

  // Salah status: 'jamaah' | 'munfarid' | 'missed'
  const salahList = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

  const initialState = salahList.map((name) => ({
    name,
    status: '',
    rawatib: {
      qabliyah: false,
      baadiyah: false
    }
  }));

  const appState = getContext('_app');

  async function changeStatus(index, status) {
    if(!confirm(`Are you sure you want to mark ${salahList[index]} as ${status}?`)) {
      return;
    }
    appState.prayers[index].status = status;
    appState.prayers = [...appState.prayers]; // Trigger reactivity
    await writePrayer(appState.prayers);
    alert(`${salahList[index]} marked as ${status}`);
  }
</script>

<!-- <main class="min-h-screen bg-[#1e1e2f] text-gray-100 p-4"> -->
  <!-- <h1 class="text-2xl font-bold mb-4 text-center">🕌 Salah Tracker</h1> -->

  {#if !appState.user}
    {#each Object.keys(appState.prayerTimes) as prayer, i (prayer)}
        <div in:fly={{y:200, duration:500 + i * 500}} out:fade class="bg-[#2a2a40] rounded-xl p-4 mb-4 shadow-md">
        <h2 class="text-xl font-semibold mb-2">{prayer} <a>{appState.prayerTimes[prayer]}</a></h2>
        </div>
    {/each}
  {:else}
    {#each appState.prayers as prayer, i (prayer.name)}
    <div in:fly={{y:200, duration:500 + i * 500}} out:fade>
    <Card class="max-w-3xl mx-auto my-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-3xl shadow-md {appState.timeLock[prayer.name] ? 'opacity-50 bg-white-100 dark:bg-white-800' : ''}">
      <h2 class="text-xl font-semibold mb-2">{prayer.name} <a>{appState.prayerTimes[prayer.name]}</a></h2>
      <div class="flex gap-2 mb-3">
        <button
          class:selected={prayer.status === 'jamaah'}
          class="flex-1 py-1 px-2 rounded-md border border-gray-500 hover:bg-green-600 transition"
          disabled={appState.timeLock[prayer.name]}
          onclick={() => changeStatus(i, 'jamaah')}
        >
          🌙 Jamaah
        </button>
        <button
          class:selected={prayer.status === 'munfarid'}
          class="flex-1 py-1 px-2 rounded-md border border-gray-500 hover:bg-yellow-600 transition"
          disabled={appState.timeLock[prayer.name]}
          onclick={() => changeStatus(i, 'munfarid')}
        >
          🙋 Munfarid
        </button>
        <button
          class:selected={prayer.status === 'missed'}
          class="flex-1 py-1 px-2 rounded-md border border-gray-500 hover:bg-red-600 transition"
          disabled={appState.timeLock[prayer.name]}
          onclick={() => changeStatus(i, 'missed')}
        >
          ❌ Missed
        </button>
      </div>

      <div class="flex gap-4 text-sm">
        {#if ['Fajr', 'Dhuhr', 'Maghrib', 'Isha'].includes(prayer.name)}
          <label class="flex items-center gap-2">
            <input
              type="checkbox"
              bind:checked={prayer.rawatib.qabliyah}
              disabled={appState.timeLock[prayer.name]}
            />
            Qabliyah
          </label>
        {/if}
        {#if ['Dhuhr', 'Maghrib', 'Isha'].includes(prayer.name)}
          <label class="flex items-center gap-2">
            <input
              type="checkbox"
              bind:checked={prayer.rawatib.baadiyah}
              disabled={appState.timeLock[prayer.name]}
            />
            Ba'diyah
          </label>
        {/if}
      </div>
    </Card>
    </div>
  {/each}
  {/if}
  {#if appState.user}
  <button transition:fade={{duration: 1000}} onclick={async () => {
        await writePrayer(appState.prayers)
        alert("Prayers saved successfully!");
    }}>Save</button>
    {/if}
<!-- </main> -->

<style>
  .selected {
    background-color: #4ade80; /* green */
    border-color: transparent;
  }
</style>