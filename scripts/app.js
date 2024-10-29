// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    fetchBusinessData();
    document.getElementById('mapViewBtn').addEventListener('click', () => {
        alert('Map View functionality coming soon!');
    });
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

function filterBusinesses() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const businessCards = document.querySelectorAll('.business-card');

    businessCards.forEach(card => {
        const businessName = card.querySelector('h3').innerText.toLowerCase();
        const businessCategory = card.dataset.category.toLowerCase(); // Assuming you set a data attribute for category

        if (businessName.includes(searchTerm) || businessCategory.includes(searchTerm)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}
