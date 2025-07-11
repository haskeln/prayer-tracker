async function reverseGeocode(callback){
    // Step 1: Get user's location
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude, longitude } = position.coords;

    // Step 2: Use OpenCage API for reverse geocoding
    const apiKey = '463b0ca912b043e8b458ef489c719ea2'; // Replace with your OpenCage API key
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      // Step 3: Extract city name
      const city = data.results[0].components.city || data.results[0].components.town || data.results[0].components.village;
      const country = data.results[0].components.country;
      callback({ city, country });
    } catch (error) {
      console.error('Error fetching city data:', error);
    }
  }, (error) => {
    console.error('Geolocation error:', error.message);
  });
} else {
  console.error('Geolocation is not supported by this browser.');
}

}

async function getLatitudeLongitude(callback) {
    let latitude = 1, longitude = 1;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            callback({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        }, (error) => {
            console.error('Geolocation error:', error.message);
        });
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
}

export { reverseGeocode, getLatitudeLongitude };