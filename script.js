// --- Selectors ---
const cityInput = document.querySelector('.city-input');
const searchBtn = document.querySelector('.search-btn');
const weatherSection = document.querySelector('.weather-info');
const notFoundSection = document.querySelector('.not-found');
const searchCitySection = document.querySelector('.search-city');

// Before
fetch(`/weather?city=${city}`);

// After
fetch(`https://weather-backend.onrender.com/weather?city=${city}`);

// --- Event Listeners ---
searchBtn.addEventListener('click', () => {
    if (cityInput.value.trim() !== '') {
        updateWeatherInfo(cityInput.value.trim());
        cityInput.value = '';
        cityInput.blur();
    }
});

cityInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && cityInput.value.trim() !== '') {
        updateWeatherInfo(cityInput.value.trim());
        cityInput.value = '';
        cityInput.blur();
    }
});

// --- Functions ---
async function updateWeatherInfo(city) {
    try {
        const response = await fetch(`/weather?city=${city}`);
        const weatherData = await response.json();

        if (response.status !== 200) {
            showDisplaySection(notFoundSection);
            alert(weatherData.error || 'City not found!');
            return;
        }

        console.log(weatherData);
        showDisplaySection(weatherSection);

        document.querySelector('.country-txt').innerText = weatherData.name;
        document.querySelector('.current-date-txt').innerText = formatDate(new Date());

        document.querySelector('.temp-txt').innerText = `${Math.round(weatherData.main.temp)}°C`;
        document.querySelector('.condition-txt').innerText = weatherData.weather[0].main;

        document.querySelector('.humidity-value-txt').innerText = `${weatherData.main.humidity}%`;
        document.querySelectorAll('.humidity-value-txt')[1].innerText = `${weatherData.wind.speed} M/s`;

        document.querySelector('.weather-summary-img').src = getWeatherIcon(weatherData.weather[0].main);

    } catch (error) {
        console.error('Error:', error);
    }
}

function showDisplaySection(section) {
    [weatherSection, notFoundSection, searchCitySection].forEach(sec => {
        sec.style.display = 'none';
    });
    section.style.display = 'flex';
}

function formatDate(date) {
    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    return date.toLocaleDateString('en-US', options);
}

function getWeatherIcon(condition) {
    const iconMap = {
        Clear: 'assets/weather/clear.svg',
        Clouds: 'assets/weather/clouds.svg',
        Rain: 'assets/weather/rain.svg',
        Drizzle: 'assets/weather/drizzle.svg',
        Thunderstorm: 'assets/weather/thunderstorm.svg',
        Snow: 'assets/weather/snow.svg',
        Atmosphere: 'assets/weather/atmosphere.svg'
    };
    return iconMap[condition] || 'assets/weather/clear.svg';
}

// --- Default City Weather ---
updateWeatherInfo('Mumbai');
// Show the search city section by default