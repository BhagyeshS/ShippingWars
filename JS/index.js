document.querySelector('.navbar-toggle').addEventListener('click', function() {
    console.log('Hamburger clicked'); // Check if this message appears in the console
    document.querySelector('.navbar-menu').classList.toggle('active');
});




const container = document.getElementById('cards-container');
const apiUrl = 'http://54.220.202.86:8080/api/shipments/getdata';
// const proxyUrl = 'http://localhost:3000/proxy?url=';

// Function to handle bid submission
function submitBid(shipmentId, bidAmount) {
    fetch('http://54.220.202.86:8080/api/bids/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            shipmentId: shipmentId,
            bidAmount: bidAmount,
            shipperId:1,
            bidTime: new Date(),
            bidStatus: "pending",

        })
    })
    .then(response => {
        if (response.ok) {
            console.log('Bid placed successfully');
            alert('Bid placed successfully!');
            // Optionally, you can update the UI to reflect the bid placement
        } else {
            console.error('Failed to place bid');
            // Handle error if needed
        }
    })
    .catch(error => console.error('Error placing bid:', error));
}

// Function to handle card click event
function handleCardClick(shipmentId) {
    // Fetch data for the clicked shipment
    fetch(`http://54.220.202.86:8080/api/shipments/${shipmentId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Fetch last bid for the shipment
            fetch(`http://54.220.202.86:8080/api/bids/shipment/${shipmentId}`)
                .then(response => {
                    if (!response.ok) {
                        if (response.status === 404) {
                            // Handle case where no bids are posted
                            return [];
                        }
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(bids => {
                    // const lastBidAmount=bids.length > 0 ? bids[bids.length - 1].bidAmount: 0
                    // Display shipment details and last bid
                    console.log(data);
                    console.log(bids);
                    container.innerHTML = "";
                    const card = document.createElement('div');
                    card.classList.add('shipment-card-id');
                    card.innerHTML  = `
                        <h2>Shipment Details</h2>
                        <img src="${data.shipment.imageUrl}" alt="Uploaded Image" width="460" height="345" class="shipment-image-id">
                        <p>Shipment ID: ${data.shipment.shipmentId}</p>
                        <p>Last Bid: ${bids.length > 0 ? bids[bids.length - 1].bidAmount : 'No bids yet'}</p>
                        <h3>New Bid</h3>
                        <input type="number" id="bidAmount" placeholder="Enter Bid Amount">
                        <button type="submit" onclick="submitBid('${data.shipment.shipmentId}', document.getElementById('bidAmount').value)">Bid</button>
                    `;
                    container.appendChild(card);
                })
                .catch(error => console.error('Error fetching bids:', error));
        })
        .catch(error => console.error('Error fetching data:', error));
}



function AllShipments() {
// Use fetch directly without dynamic import
// fetch(proxyUrl + encodeURIComponent(apiUrl))
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        container.innerHTML = ""
        const cardContainer = document.createElement('div'); // Create a parent div for all cards
        cardContainer.classList.add('container-card'); // Add a class to the parent div
        const Heading = document.createElement('h1'); // Create a parent div for all cards
        Heading.classList.add('heading');
        Heading.innerHTML = `Shipments`
        data.map(shipment => {
            const card = document.createElement('div');
            card.classList.add('shipment-card');
            card.innerHTML = `
                <a>
                <img src="${shipment.shipment.imageUrl}" alt="Uploaded Image" width="460" height="345">
                    <h3>${shipment.shipment.shipmentId}</h3>
                    <p>Bid Amount: ${shipment.shipment.maxBidAmount}</p>
                    <p>Status: ${shipment.destinationAddress.streetAddress}</p>
                </a>`;

                card.addEventListener('click', () => {
                    handleCardClick(shipment.shipment.shipmentId);
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
