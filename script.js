document.addEventListener("DOMContentLoaded", () => {
    // Once DOM is fully loaded, attach event listener
    const searchButton = document.getElementById("search-btn");
    if (searchButton) {
      searchButton.addEventListener("click", async () => {
        const city = document.getElementById("city-input").value;
        const apiUrl = `https://weather-app-1opd.onrender.com/weather?city=${city}`;
        
        try {
          const response = await fetch(apiUrl);
          if (response.ok) {
            const data = await response.json();
            document.getElementById("result").innerHTML = `
              <p>Weather in ${city}: ${data.message}</p>
            `;
          } else {
            throw new Error("City not found");
          }
        } catch (error) {
          document.getElementById("result").innerHTML = `<p>${error.message}</p>`;
        }
      });
    } else {
      console.error("Search button not found");
    }
  });
  