document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.getElementById("search-btn");

  if (searchButton) {
    searchButton.addEventListener("click", async () => {
      const city = document.getElementById("city-input").value;

      if (!city) {
        alert("Please enter a city name.");
        return;
      }

      // Clear previous results
      const weatherInfo = document.querySelector(".weather-info");
      weatherInfo.style.display = "none";  // Hide the weather info initially
      const notFoundMessage = document.querySelector(".not-found");
      notFoundMessage.style.display = "none";  // Hide not found message

      const apiUrl = `https://weather-app-1opd.onrender.com/weather?city=${city}`;  // Backend URL on Render

      try {
        const response = await fetch(apiUrl);

        if (response.ok) {
          const data = await response.json();
          // Update weather information
          document.querySelector(".weather-info").style.display = "block"; // Show weather info
          document.querySelector(".country-txt").textContent = data.city;
          document.querySelector(".temp-txt").textContent = `${data.temperature}°C`;
          document.querySelector(".condition-txt").textContent = data.weather;
          
        } else {
          throw new Error("City not found");
        }
      } catch (error) {
        document.querySelector(".not-found").style.display = "block";  // Show not found message
        console.error(error);
      }
    });
  } else {
    console.error("Search button not found");
  }
});
