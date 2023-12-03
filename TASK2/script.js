document.addEventListener('DOMContentLoaded', function () {
    const apiKey = '2b97731d51e1d0715d41ee3722475308';
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
    const locationElement = document.getElementById('location');
    const temperatureElement = document.getElementById('temperature');
    const descriptionElement = document.getElementById('description');
    const weatherIconElement = document.getElementById('weather-icon');
    const cityInput = document.getElementById('cityInput');
    const searchBtn = document.getElementById('searchBtn');

    function updateWeather(city) {
        const url = `${apiUrl}${city}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const { name, main, weather } = data;
                locationElement.textContent = name;
                temperatureElement.textContent = `${Math.round(main.temp)}°C`;
                descriptionElement.textContent = weather[0].description;

                const weatherIconClass = getWeatherIconClass(weather[0].id);
                weatherIconElement.className = `wi ${weatherIconClass}`;
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    }

    function getWeatherIconClass(weatherId) {
        if (weatherId >= 200 && weatherId < 300) {
            return 'wi-thunderstorm';
        } else if (weatherId >= 300 && weatherId < 500) {
            return 'wi-showers';
        } else if (weatherId >= 500 && weatherId < 600) {
            return 'wi-rain';
        } else if (weatherId >= 600 && weatherId < 700) {
            return 'wi-snow';
        } else if (weatherId >= 700 && weatherId < 800) {
            return 'wi-fog';
        } else if (weatherId === 800) {
            return 'wi-day-sunny';
        } else {
            return 'wi-day-cloudy';
        }
    }

    searchBtn.addEventListener('click', function () {
        const cityName = cityInput.value.trim();
        if (cityName !== '') {
            updateWeather(cityName);
        } else {
            alert('Please enter a city name.');
        }
    });

    // Example: Update weather for 'London' on page load
    updateWeather('London');
});
