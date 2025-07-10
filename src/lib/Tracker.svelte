<script>
  import { writable } from 'svelte/store';
  import { writePrayer } from './firebase';
  import { getContext } from 'svelte';

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

  export let prayers = writable(initialState);
  const appState = getContext('_app');
</script>

<main class="min-h-screen bg-[#1e1e2f] text-gray-100 p-4">
  <h1 class="text-2xl font-bold mb-4 text-center">🕌 Daily Salah Tracker</h1>

  {#each $prayers as prayer, i (prayer.name)}
    <div class="bg-[#2a2a40] rounded-xl p-4 mb-4 shadow-md">
      <h2 class="text-xl font-semibold mb-2">{prayer.name}</h2>

      <div class="flex gap-2 mb-3">
        <button
          class:selected={prayer.status === 'jamaah'}
          class="flex-1 py-1 px-2 rounded-md border border-gray-500 hover:bg-green-600 transition"
          onclick={() => prayers.update(p => { p[i].status = 'jamaah'; return [...p]; })}
        >
          🌙 Jamaah
        </button>
        <button
          class:selected={prayer.status === 'munfarid'}
          class="flex-1 py-1 px-2 rounded-md border border-gray-500 hover:bg-yellow-600 transition"
          onclick={() => prayers.update(p => { p[i].status = 'munfarid'; return [...p]; })}
        >
          🙋 Munfarid
        </button>
        <button
          class:selected={prayer.status === 'missed'}
          class="flex-1 py-1 px-2 rounded-md border border-gray-500 hover:bg-red-600 transition"
          onclick={() => prayers.update(p => { p[i].status = 'missed'; return [...p]; })}
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
            />
            Qabliyah
          </label>
        {/if}
        {#if ['Dhuhr', 'Maghrib', 'Isha'].includes(prayer.name)}
          <label class="flex items-center gap-2">
            <input
              type="checkbox"
              bind:checked={prayer.rawatib.baadiyah}
            />
            Ba'diyah
          </label>
        {/if}
      </div>
    </div>
  {/each}
  <button onclick={() => {writePrayer(appState.user.uid, $prayers)}}>Save</button>
</main>

<style>
  .selected {
    background-color: #4ade80; /* green */
    border-color: transparent;
  }
</style>