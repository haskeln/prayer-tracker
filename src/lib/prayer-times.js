import { get } from "svelte/store";
import { getLatitudeLongitude } from "./geocode";


function getPrayerTimes(callback) {
    getLatitudeLongitude(async (location) => {
        if (!location || !location.latitude || !location.longitude) {
            console.error("Location not available");
            return;
        }
        const prayerTimes = await fetchPrayerTimes(location.latitude, location.longitude);
        callback(prayerTimes);
    })
}

async function fetchPrayerTimes(lat, long) {
    const isoDate = new Date().toISOString().split('T')[0];
    const day = isoDate.split('-')[2];
    const month = isoDate.split('-')[1];
    const year = isoDate.split('-')[0];
    const reponse = await fetch(`https://api.aladhan.com/v1/timings/${day}-${month}-${year}?latitude=${lat}&longitude=${long}&method=2`)
    .then(response => response.json()).then(data => {
        if (data.code !== 200) {
            throw new Error(`Error fetching prayer times: ${data.status}`);
        }
        return data.data.timings;
    }).catch(error => {
        console.error("Failed to fetch prayer times:", error);
        return null;
    });
    console.log("Prayer times fetched:", reponse);
    return reponse;
}

export {getPrayerTimes}