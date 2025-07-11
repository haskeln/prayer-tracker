

async function getPrayerTimes(){
    const reponse = await fetch('https://api.aladhan.com/v1/timingsByCity?city=London&country=United Kingdom&method=2')
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