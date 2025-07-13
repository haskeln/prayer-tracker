
<script>
  import { fetchQuran } from "$lib/quran";
  import { onMount, getContext } from "svelte";
  import { Card } from "flowbite-svelte";
  import { app } from "$lib/firebase";
  import { AngleLeftOutline, AngleRightOutline } from "flowbite-svelte-icons";

  const appState = getContext('_app');

  let quranData = $state([]);
  let mode = $state("normal");

  onMount(async () => {
    getQuran()
  })

    $effect(() => {
        if(appState.quran.current.surah != appState.quran.last.surah){
            appState.quran.last.ayah = -1
        }
    })
    async function getQuran(){
        const data = await fetchQuran();
        console.log("Quran text fetched:", data);
        quranData = data;
    }

    function getAyahs(){
        let qurantext = [];
        if (appState.quran.current.surah < 1 || appState.quran.current.surah > 114) {
            return;
        }
        const surah = quranData[appState.quran.current.surah - 1];
        if (surah) {
            qurantext = surah.ayahs.map((ayah, index) => ({text : `${ayah.text} (${index + 1})`, number: ayah.number, localNumber: index}));
            if(appState.quran.current.surah != 9){qurantext[0].text = qurantext[0].text.split('بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ')[1]}
        } else {
            qurantext = "Surah not found.";
        }
        return qurantext;
    }
</script>

<input bind:value={appState.quran.lastSurah} type="number" placeholder="Enter surah number"/>
{#if quranData.length > 0}
    <Card id="surah-profile" class="max-w-3xl mx-auto my-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-3xl shadow-md">
        <h2 class="text-2xl font-bold text-center mb-4">Surah {appState.quran.current.surah} - {quranData[appState.quran.current.surah - 1]?.name}</h2>
        <div class="text-center mb-4">{quranData[appState.quran.current.surah - 1]?.englishName}</div>
        <div class="text-center mb-4">Total Ayahs: {quranData[appState.quran.current.surah - 1]?.ayahs.length}</div>
        <div class="text-center mb-4">Revelation: {quranData[appState.quran.current.surah - 1]?.revelationType}</div>
    </Card>
    {#if appState.quran.current.surah != 9}
    <h3 class="text-center">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</h3>
    {/if}
{/if}


<div class="w-full text-xl">
{#each getAyahs() as ayah, i}
    {#if mode === "tilawah"}
        {#if ayah.number <= appState.quran.lastGlobalAyah}
            <p class="text-end">{ayah.text}</p>
            {:else}
            <p class="text-end"><a onclick={() => {
                appState.quran.last.ayah = ayah.localNumber;
                appState.quran.lastGlobalAyah = ayah.number
                }} class="text-end">{ayah.text}</a></p>
        {/if}
    {:else}
        {#if ayah.localNumber <= appState.quran.last.ayah}
            <p class="text-end">{ayah.text}</p>
            {:else}
            <p class="text-end"><a onclick={() => {
                appState.quran.last.ayah = ayah.localNumber;
                appState.quran.lastGlobalAyah = ayah.number
                appState.quran.last.surah = appState.quran.current.surah;
                }} class="text-end">{ayah.text}</a></p>
        {/if}
    {/if}
{/each}
</div>
<div class="flex flex-wrap flex-row gap-4 fixed bottom-2 left-4 bg-gray backdrop-blur-xs w-full p-4 rounded-lg shadow-lg">
    {#if appState.quran.current.surah < 114}
    <button class="flex" onclick={() => {appState.quran.current.surah++}}><AngleLeftOutline/>{quranData[appState.quran.current.surah]?.name}</button>
    {/if}
    {#if appState.quran.current.surah > 1}
    <button class="flex" onclick={() => {appState.quran.current.surah--}}>{quranData[appState.quran.current.surah - 2]?.name}<AngleRightOutline/></button>
    {/if}
    <a class="button" href="#surah-profile" onclick={() => {appState.quran.last.ayah = 0}}>Restart</a>
    <button disabled onclick={() => {mode = mode === "normal" ? "tilawah" : "normal"}}>Mode: {mode}</button>
</div>