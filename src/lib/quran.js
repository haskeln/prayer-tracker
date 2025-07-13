async function fetchQuran() {
    const response = await fetch('https://api.alquran.cloud/v1/quran/quran-uthmani');
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (!data || !data.data || !data.data.surahs) {
        throw new Error('Invalid Quran data format');
    }
    return data.data.surahs.map(surah => ({
        number: surah.number,
        name: surah.name,
        englishName: surah.englishName,
        numberOfAyahs: surah.numberOfAyahs,
        revelationType: surah.revelationType,
        ayahs: surah.ayahs.map(ayah => ({
            number: ayah.number,
            text: ayah.text,
            juz: ayah.juz,
            manzil: ayah.manzil,
            page: ayah.page,
            ruku: ayah.ruku,
            hizbQuarter: ayah.hizbQuarter
        }))
    }));
}

async function getQuranData(callback) {
    await fetchQuran().then(quranData => {
        callback(quranData);
    })
}

export { getQuranData, fetchQuran };