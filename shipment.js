// Function to fetch shipment details by ID
function fetchShipmentDetails(shipmentId) {
    const apiUrl = `http://54.220.202.86:8080/api/shipments/${shipmentId}`;
    const proxyUrl = 'http://localhost:3000/proxy?url=';

    return fetch(proxyUrl + encodeURIComponent(apiUrl))
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch shipment details');
            }
            return response.json();
        });
}

// Function to display shipment details
function displayShipmentDetails(shipment) {
    const container = document.getElementById('shipment-details');
    container.innerHTML = `
        <h1>Shipment Details</h1>
        <p><strong>Shipment ID:</strong> ${shipment.shipmentId}</p>
        <p><strong>Bid amount:</strong> ${shipment.maxBidAmount}</p>
        <p><strong>Status:</strong> ${shipment.bidStartTime}</p>
        <!-- Add other relevant details here -->
    `;
}

// Get the shipment ID from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const shipmentId = urlParams.get('id');

// Fetch and display shipment details
fetchShipmentDetails(shipmentId)
    .then(shipment => {
        displayShipmentDetails(shipment);
    })
    .catch(error => {
        console.error('Error fetching shipment details:', error);
    });
