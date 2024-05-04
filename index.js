const container = document.getElementById('cards-container');
const apiUrl = 'http://54.220.202.86:8080/api/shipments/getdata';
const proxyUrl = 'http://localhost:3000/proxy?url=';

// Function to handle card click event
function handleCardClick(shipmentId) {
    window.location.href = `https://example.com/shipment/${shipmentId}`; // Replace example.com with your actual domain
}

// Use fetch directly without dynamic import
fetch(proxyUrl + encodeURIComponent(apiUrl))
    .then(response => response.json())
    .then(data => {
        data.forEach(shipment => {
            const card = document.createElement('div');
            card.classList.add('shipment-card');
            card.innerHTML = `
            <a>
                <h3> ${shipment.shipmentId}</h3>
                <p>bid amount: ${shipment.maxBidAmount}</p>
                <p>Status: ${shipment.bidStartTime}</p>
            <!--    <img src="${shipment.imageUrl}" alt="Shipment Image">  --> 
            </a>
           <!-- Add other relevant properties here -->
            `;
            

             // Attach click event listener to the card
             card.addEventListener('click', () => {
                handleCardClick(shipment.shipmentId);
            });
            container.appendChild(card);
        });
    })
    .catch(error => console.error('Error fetching data:', error));
