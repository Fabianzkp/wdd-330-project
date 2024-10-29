// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const businessName = urlParams.get('name'); // Get the business name from the URL
    fetchBusinessData(businessName);
});

// Fetch and display the specific business data
async function fetchBusinessData(businessName) {
    try {
        const response = await fetch('data/businesses.json'); // Ensure this path is correct
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const businesses = await response.json();
        const business = businesses.find(b => b.name === decodeURIComponent(businessName)); // Find the business by name

        if (business) {
            displayBusinessProfile(business);
        } else {
            document.getElementById('businessProfile').innerHTML = '<p>Business not found.</p>';
        }
    } catch (error) {
        console.error('Error fetching business data:', error);
        document.getElementById('businessProfile').innerHTML = '<p>Unable to load business data.</p>';
    }
}

// Function to display the business profile
function displayBusinessProfile(business) {
    const profile = document.getElementById('businessProfile');
    profile.innerHTML = `
        <img src="${business.image}" alt="${business.name}">
        <h2>${business.name}</h2>
        <p>${business.address}</p>
        <p>${business.details}</p>
        <p>Phone: <strong>${business.phone}</strong></p>
    `;

    // Call initMap with business coordinates
    initMap(business.latitude, business.longitude);
}

// Initialize Leaflet Map
function initMap(latitude, longitude) {
    const location = [latitude, longitude]; // Leaflet uses [lat, lng]

    const map = L.map('map').setView(location, 15); // Set initial view of the map

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    // Add a marker
    L.marker(location).addTo(map)
        .bindPopup('Location: ' + location)
        .openPopup();
}
