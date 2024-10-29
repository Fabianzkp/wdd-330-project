document.addEventListener('DOMContentLoaded', () => {
    fetchBusinessData();
    fetchWeatherData(); // Automatically fetch weather data on page load
});

// Fetch and display business data from JSON file
async function fetchBusinessData() {
    try {
        const response = await fetch('data/businesses.json'); // Ensure this path is correct
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const businesses = await response.json();
        displayBusinesses(businesses);
    } catch (error) {
        console.error('Error fetching business data:', error);
    }
}

// Function to display businesses on the page
function displayBusinesses(businesses) {
    const businessList = document.getElementById('businessList');
    businessList.innerHTML = ''; // Clear any existing content

    businesses.forEach(business => {
        const card = document.createElement('div');
        card.className = 'business-card';

        // Set the inner HTML for each business card
        card.innerHTML = `
            <img src="${business.image}" alt="${business.name}">
            <h3>${business.name}</h3>
            <p>${business.address}</p>
            <button class="view-profile" onclick="location.href='profile.html?name=${encodeURIComponent(business.name)}'">View Profile</button>
        `;

        // Append each card to the business list
        businessList.appendChild(card);
    });
}

// Fetch weather data and display it
function fetchWeatherData() {
    const weatherApiKey = '19986686d43ac7cac75b81de240e71b0';
    const ipinfoToken = '14e9427bfcf742'; // Replace with your actual IPinfo token

    // Fetch user location based on IP
    fetch(`https://ipinfo.io?token=${ipinfoToken}`)
        .then(response => response.json())
        .then(data => {
            const [lat, lon] = data.loc.split(','); // Get lat and lon from loc string
            fetchWeather(lat, lon); // Fetch weather for the user's location
        })
        .catch(error => {
            console.error("Error fetching IP information:", error);
            // Fallback to predefined coordinates if IP fetch fails
            fetchWeather(4.975394198277854, 8.339750278691453); // Default coordinates
        });
}

// Function to fetch and display weather data
function fetchWeather(lat, lon) {
    const weatherApiKey = '19986686d43ac7cac75b81de240e71b0';
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`;

    fetch(weatherUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            // Display the weather information
            const weatherInfo = `
                <h2>Weather in ${data.name}, ${data.sys.country}</h2>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Weather: ${data.weather[0].description}</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            `;
            document.getElementById("weatherInfo").innerHTML = weatherInfo; // Update the weather info div
        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error);
        });
}
