<script>
import { AccordionItem, Accordion, Card } from "flowbite-svelte";
import { getContext } from "svelte";
import { getAuth } from "firebase/auth";
import { writeSunnah } from "$lib/firebase";

const appState = getContext('_app');

</script>
<div class="flex flex-row gap-4 flex-wrap items-center justify-center">
       <Card class="mb-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col gap-4 md:w-1/2 lg:w-1/3">
            <label>
            <input type="checkbox" bind:checked={appState.sunnah.ishraq} onclick={async () => {
                confirm("Are you sure you want to toggle Ishraq?")
                }} onchange={async () => {
                    await writeSunnah(appState.sunnah);
                    alert("Ishraq toggled successfully");
                }}>
            Ishraq
        </label>
        a Sunnah prayer performed after sunrise.
        <a href="https://www.islamicfinder.org/prayer-times/ishraq/" target="_blank" class="text-blue-500 hover:underline">Learn more</a>
       </Card>
       <Card class="mb-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col gap-4 md:w-1/2 lg:w-1/3">
            <label>
            <input type="checkbox" bind:checked={appState.sunnah.dhuha} onclick={async () => {
                confirm("Are you sure you want to toggle Dhuha?")
                }} onchange={async () => {
                    await writeSunnah(appState.sunnah);
                    alert("Dhuha toggled successfully");
                }}>
            Dhuha
        </label>
        a Sunnah prayer performed in the forenoon.
        <a href="https://www.islamicfinder.org/prayer-times/dhuha/" target="_blank" class="text-blue-500 hover:underline">Learn more</a>
       </Card>
       <Card class="mb-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col gap-4 md:w-1/2 lg:w-1/3">
            <label>
            <input type="checkbox" bind:checked={appState.sunnah.tahiyyatulMasjid} onclick={async () => {
                confirm("Are you sure you want to toggle Tahiyyatul Masjid?")
                }}  onchange={async () => {
                    await writeSunnah(appState.sunnah);
                    alert("Tahiyyatul Masjid toggled successfully");
                }}>
            Tahiyyatul Masjid
        </label>
        a Sunnah prayer performed upon entering the mosque.
        <a href="https://www.islamicfinder.org/prayer-times/tahiyyatul-masjid/" target="_blank" class="text-blue-500 hover:underline">Learn more</a>
       </Card>
       <Card class="mb-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col gap-4 md:w-1/2 lg:w-1/3">
            <label>
            <input type="checkbox" bind:checked={appState.sunnah.tahiyyatulWudu} onclick={async () => {
                confirm("Are you sure you want to toggle Tahiyyatul Wudu?")
                }} onchange={async () => {
                    await writeSunnah(appState.sunnah);
                    alert("Tahiyyatul Wudu toggled successfully");
                }}>
            Tahiyyatul Wudu
        </label>
        a Sunnah prayer performed after performing ablution.
        <a href="https://www.islamicfinder.org/prayer-times/tahiyyatul-wudu/" target="_blank" class="text-blue-500 hover:underline">Learn more</a>
       </Card>
       <Card class="mb-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col gap-4 md:w-1/2 lg:w-1/3">
            <label>
            <input type="checkbox" bind:checked={appState.sunnah.tahajjud}  onclick={async () => {
                confirm("Are you sure you want to toggle Tahajjud?")
                }} onchange={async () => {
                    await writeSunnah(appState.sunnah);
                    alert("Tahajjud toggled successfully");
                }}>
            Tahajjud
        </label>
        a Sunnah prayer performed at night.
        <a href="https://www.islamicfinder.org/prayer-times/tahajjud/" target="_blank" class="text-blue-500 hover:underline">Learn more</a>
       </Card>
       <Card class="mb-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col gap-4 md:w-1/2 lg:w-1/3">
            <label>
            <input type="checkbox" bind:checked={appState.sunnah.witr} onclick={async () => {
                confirm("Are you sure you want to toggle Witr?")
                }}  onchange={async () => {
                    await writeSunnah(appState.sunnah);
                    alert("Witr toggled successfully");
                }}>
            Witr
        </label>
        a Sunnah prayer performed after the Isha prayer.
        <a href="https://www.islamicfinder.org/prayer-times/witr/" target="_blank" class="text-blue-500 hover:underline">Learn more</a>
       </Card>

</div>