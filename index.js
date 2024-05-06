document.querySelector('.navbar-toggle').addEventListener('click', function() {
    console.log('Hamburger clicked'); // Check if this message appears in the console
    document.querySelector('.navbar-menu').classList.toggle('active');
});




const container = document.getElementById('cards-container');
const apiUrl = 'http://54.220.202.86:8080/api/shipments/getdata';
// const proxyUrl = 'http://localhost:3000/proxy?url=';

// Function to handle card click event
function handleCardClick(shipmentId) {
    // Fetch data for the clicked shipment
    // fetch(proxyUrl + encodeURIComponent(`http://54.220.202.86:8080/api/shipments/${shipmentId}`))
    fetch(`http://54.220.202.86:8080/api/shipments/${shipmentId}`)
        .then(response => response.json())
        .then(data => {
            // Display shipment details
            console.log(data)
            container.innerHTML = ""
            const card = document.createElement('div');
            card.classList.add('shipment-card');
            card.innerHTML  = `
            <h2>Shipment Details</h2>
            <p>Shipment ID: ${data.shipmentId}</p>
            <p>Bid Amount: ${data.maxBidAmount}</p>
            <p>Status: ${data.bidStartTime}</p>
            <p>hello</p>
            <!-- Add more details as needed -->
        `;
        container.appendChild(card);
            // data.forEach(shipment => {
            //     const card = document.createElement('div');
            //     card.classList.add('shipment-card');
            //     card.innerHTML  = `
            //     <h2>Shipment Details</h2>
            //     <p>Shipment ID: ${data.shipmentId}</p>
            //     <p>Bid Amount: ${data.maxBidAmount}</p>
            //     <p>Status: ${data.bidStartTime}</p>
            //     <!-- Add more details as needed -->
            // `;
            // container.appendChild(card);
            })
            // Replace the content of a div with ID 'shipment-details' with the shipment details
            
            
            // document.getElementById('shipment-details').innerHTML = shipmentDetails;
        // })
        
        .catch(error => console.error('Error fetching data:', error));
}

function AllShipments() {
// Use fetch directly without dynamic import
// fetch(proxyUrl + encodeURIComponent(apiUrl))
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        container.innerHTML = ""
        const cardContainer = document.createElement('div'); // Create a parent div for all cards
        cardContainer.classList.add('container-card'); // Add a class to the parent div
        const Heading = document.createElement('h1'); // Create a parent div for all cards
        Heading.classList.add('heading');
        Heading.innerHTML = `Shipments`
        data.forEach(shipment => {
            const card = document.createElement('div');
            card.classList.add('shipment-card');
            card.innerHTML = `
                <a>
                    <h3>${shipment.shipmentId}</h3>
                    <p>Bid Amount: ${shipment.maxBidAmount}</p>
                    <p>Status: ${shipment.bidStartTime}</p>
                </a>`;

                card.addEventListener('click', () => {
                    handleCardClick(shipment.shipmentId);
                });
            // Append the card to the parent div
            cardContainer.appendChild(card);
        });
        container.appendChild(Heading);
        // Append the parent div to the container
        container.appendChild(cardContainer);
    })
    .catch(error => console.error('Error fetching data:', error));
}

AllShipments();