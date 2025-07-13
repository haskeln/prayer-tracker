
<script>
  import { fetchQuran } from "$lib/quran";
  import { onMount } from "svelte";
  import { Card } from "flowbite-svelte";

  let quranData = $state([]);
  let selectedSurah = $state(1);
  let lastAyahNumber = $state(0);

  onMount(async () => {
    getQuran()
  })
    async function getQuran(){
        const data = await fetchQuran();
        console.log("Quran text fetched:", data);
        quranData = data;
    }

    function getAyahs(){
        let qurantext = [];
        if (selectedSurah < 1 || selectedSurah > 114) {
            return;
        }
        const surah = quranData[selectedSurah - 1];
        if (surah) {
            qurantext = surah.ayahs.map((ayah, index) => ({text : `${ayah.text} (${index + 1})`, number: ayah.number}));
            if(selectedSurah != 9){qurantext[0].text = qurantext[0].text.split('بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ')[1]}
        } else {
            qurantext = "Surah not found.";
        }
        return qurantext;
    }
</script>

<input bind:value={selectedSurah} type="number" placeholder="Enter surah number"/>
{#if quranData.length > 0}
    <Card class="max-w-3xl mx-auto my-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-3xl shadow-md">
        <h2 class="text-2xl font-bold text-center mb-4">Surah {selectedSurah} - {quranData[selectedSurah - 1]?.name}</h2>
        <div class="text-center mb-4">{quranData[selectedSurah - 1]?.englishName}</div>
        <div class="text-center mb-4">Total Ayahs: {quranData[selectedSurah - 1]?.ayahs.length}</div>
        <div class="text-center mb-4">Revelation: {quranData[selectedSurah - 1]?.revelationType}</div>
    </Card>
    {#if selectedSurah != 9}
    <h3 class="text-center">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</h3>
    {/if}
{/if}

{#each getAyahs() as ayah, i}
{#if ayah.number <= lastAyahNumber}
<p class="text-end">{ayah.text}</p>
{:else}
<p class="text-end"><a onclick={() => {lastAyahNumber = ayah.number}} class="text-end">{ayah.text}</a></p>
{/if}
{/each}
<button onclick={() => {selectedSurah++}}>Next Surah - {quranData[selectedSurah]?.name}</button>
<button onclick={() => {selectedSurah--}}>Prev Surah - {quranData[selectedSurah - 2]?.name}</button>