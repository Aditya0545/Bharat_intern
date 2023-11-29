// script.js

// Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
const apiKey = '2b97731d51e1d0715d41ee3722475308';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

function getWeather() {
    // Get the user-entered city from the input field
    const cityInput = document.getElementById('city');
    const city = cityInput.value;

    // Check if the city is not empty
    if (city.trim() === '') {
        alert('Please enter a city');
        return;
    }

    // Construct the API URL with the city and API key
    const apiUrl = `${baseUrl}?q=${city}&appid=${apiKey}`;

    // Fetch weather data from the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Update the DOM with the weather information
            const locationElement = document.getElementById('location');
            const temperatureElement = document.getElementById('temperature');
            const descriptionElement = document.getElementById('description');

            locationElement.textContent = `Weather in ${data.name}, ${data.sys.country}`;
            temperatureElement.textContent = `Temperature: ${data.main.temp}°C`;
            descriptionElement.textContent = `Description: ${data.weather[0].description}`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again later.');
        });
}
