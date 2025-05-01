document.querySelector('#search-btn').addEventListener('click', async () => {
    const city = document.querySelector('#city-input').value.trim();
    
    if (!city) {
      alert('Please enter a city name.');
      return;
    }
  
    try {
      const response = await fetch(`https://weather-app-1opd.onrender.com/weather?city=${encodeURIComponent(city)}`);
      
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
  
      const data = await response.json();
  
      // Example: Update your DOM with weather info
      document.querySelector('#result').textContent = `Weather for ${city}: ${data.message || 'Data received'}`;
    } catch (error) {
      console.error('Fetch error:', error);
      document.querySelector('#result').textContent = 'Failed to fetch weather data.';
    }
  });
  