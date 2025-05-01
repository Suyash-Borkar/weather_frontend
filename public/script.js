async function updateWeatherInfo(city) {
    try {
        // Show loading state
        showDisplaySection(searchCitySection);

        // Fetch weather data
        const response = await fetch(`https://weather-app-1opd.onrender.com/weather?city=${city}`);
        const weatherData = await response.json();

        if (response.status !== 200) {
            showDisplaySection(notFoundSection);
            alert(weatherData.error || 'City not found!');
            return;
        }

        console.log(weatherData);

        // Show weather information section
        showDisplaySection(weatherSection);

        // Update the DOM with weather data
        document.querySelector('.country-txt').innerText = weatherData.name;
        document.querySelector('.current-date-txt').innerText = formatDate(new Date());

        document.querySelector('.temp-txt').innerText = `${Math.round(weatherData.main.temp)}°C`;
        document.querySelector('.condition-txt').innerText = weatherData.weather[0].main;

        document.querySelector('.humidity-value-txt').innerText = `${weatherData.main.humidity}%`;
        document.querySelectorAll('.humidity-value-txt')[1].innerText = `${weatherData.wind.speed} M/s`;

        document.querySelector('.weather-summary-img').src = getWeatherIcon(weatherData.weather[0].main);

    } catch (error) {
        console.error('Error:', error);
        showDisplaySection(notFoundSection); // Show error section if fetch fails
    }
}
