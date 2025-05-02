// document.addEventListener("DOMContentLoaded", () => {
//   const searchButton = document.getElementById("search-btn");

//   if (searchButton) {
//     searchButton.addEventListener("click", async () => {
//       const city = document.getElementById("city-input").value;

//       if (!city) {
//         alert("Please enter a city name.");
//         return;
//       }

//       // Clear previous results
//       const weatherInfo = document.querySelector(".weather-info");
//       weatherInfo.style.display = "none";  // Hide the weather info initially
//       const notFoundMessage = document.querySelector(".not-found");
//       notFoundMessage.style.display = "none";  // Hide not found message

//       const apiUrl = `https://weather-app-1opd.onrender.com/weather?city=${city}`;  // Backend URL on Render

//       try {
//         const response = await fetch(apiUrl);

//         if (response.ok) {
//           const data = await response.json();
//           // Update weather information
//           document.querySelector(".weather-info").style.display = "block"; // Show weather info
//           document.querySelector(".country-txt").textContent = data.city;
//           document.querySelector(".temp-txt").textContent = `${data.temperature}°C`;
//           document.querySelector(".condition-txt").textContent = data.weather;
          
//         } else {
//           throw new Error("City not found");
//         }
//       } catch (error) {
//         document.querySelector(".not-found").style.display = "block";  // Show not found message
//         console.error(error);
//       }
//     });
//   } else {
//     console.error("Search button not found");
//   }
// });

document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.getElementById("search-btn");
  const cityInput = document.getElementById("city-input");
  const weatherInfo = document.querySelector(".weather-info");
  const notFoundMessage = document.querySelector(".not-found");
  const searchCitySection = document.querySelector(".search-city"); // Section to hide after search

  if (!searchButton || !cityInput) {
    console.error("Required DOM elements not found.");
    return;
  }

  // Handle search button click
  searchButton.addEventListener("click", () => {
    handleSearch();
  });

  // Handle Enter key press in input field
  cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  });

  // Function to handle the search
  function handleSearch() {
    const city = cityInput.value.trim();
    if (!city) {
      alert("Please enter a city name.");
      return;
    }
    fetchWeatherData(city);
  }

  // Function to fetch weather data
  async function fetchWeatherData(city) {
    const apiUrl = `https://weather-app-1opd.onrender.com/weather?city=${encodeURIComponent(city)}`;

    resetDisplay();  // Reset UI before fetching data

    try {
      const response = await fetch(apiUrl);

      // Check for a successful response
      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();

      // Send the data to update the UI
      updateWeatherInfo(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      showError();
    }
  }

  // Reset the UI by hiding all sections
  function resetDisplay() {
    weatherInfo.style.display = "none";
    notFoundMessage.style.display = "none";
    searchCitySection.style.display = "none"; // Hide search city section after search
  }

  // Function to update weather information on the UI
  function updateWeatherInfo(data) {
    // Populate the weather info section with the fetched data
    document.querySelector(".country-txt").textContent = data.city;
    document.querySelector(".temp-txt").textContent = `${data.temperature}°C`;
    document.querySelector(".condition-txt").textContent = data.weather;

    // Display the weather info section
    weatherInfo.style.display = "block";

    // Hide the search city section after the data is fetched
    searchCitySection.style.display = "none";
  }

  // Function to show the error fallback message
  function showError() {
    // Display the not found message when there is an error
    notFoundMessage.style.display = "block";

    // Optionally, you can re-enable the search city section or add other UI feedback here
    setTimeout(() => {
      searchCitySection.style.display = "flex";  // Allow the user to try searching again
    }, 3000); // Delay for 3 seconds before showing the search section again
  }
});
