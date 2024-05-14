document.querySelector('.navbar-toggle').addEventListener('click', function() {
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
                    const lastBidAmount = bids.length > 0 ? bids[bids.length - 1].bidAmount : 0;
                    console.log(data);
                    console.log(bids);
                    container.innerHTML = "";
                    const card = document.createElement('div');
                    card.classList.add('shipment-card-id');
                    card.innerHTML  = `
                        <h2>Shipment Details</h2>
                        <img src="${data.shipment.imageUrl}" alt="Uploaded Image" width="460" height="345" class="shipment-image-id">
                        <p><span>PickUp Date:</span>${data.shipment.shipmentDate}</p>
                    <p><span>Delivery Date:</span>${data.shipment.deliveryDate}</p>
                    <p><span>Max Bid Amount:</span> ${data.shipment.maxBidAmount}</p>
                    <p><span>Pickup Address:</span> ${data.originAddress.streetAddress} ${data.originAddress.city} ${data.originAddress.state}</p>
                    <p><span>Delivery Address:</span> ${data.destinationAddress.streetAddress} ${data.destinationAddress.city} ${data.destinationAddress.state}</p>
                        <p>Last Bid: ${bids.length > 0 ? bids[bids.length - 1].bidAmount : 'No bids yet'}</p>
                        <h3>New Bid</h3>
                        <input type="number" id="bidAmount" placeholder="Enter Bid Amount" min="0"> <!-- Set min attribute to 0 -->
                        <button type="submit" onclick="submitBid('${data.shipment.shipmentId}', document.getElementById('bidAmount').value)" ${lastBidAmount > 0 ? `` : `disabled`}>Bid</button>
                    `;
                    container.appendChild(card);
                    document.getElementById('bidAmount').addEventListener('input', function() {
                        const bidInput = parseInt(this.value);
                        const bidButton = document.querySelector('.shipment-card-id button[type="submit"]');
                        if (bidInput >= lastBidAmount || bidInput>maxBidAmount || bidInput < 0) {
                            bidButton.disabled = true;
                        } else {
                            bidButton.disabled = false;
                        }
                    });
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
        const loader = document.querySelector('.loader');
    loader.style.display = 'block';
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
                <div class="imagebox">
                <img src="${shipment.shipment.imageUrl}" alt="Uploaded Image" width="460" height="345">
                </div>
                <div class="content">
                    <p><span>PickUp Date:</span>${shipment.shipment.shipmentDate}</p>
                    <p><span>Delivery Date:</span>${shipment.shipment.deliveryDate}</p>
                    <p><span>Max Bid Amount:</span> ${shipment.shipment.maxBidAmount}</p>
                    </div>
                </a>`;

                card.addEventListener('click', () => {
                    handleCardClick(shipment.shipment.shipmentId);
                });
            // Append the card to the parent div
            loader.style.display = 'none';
            cardContainer.appendChild(card);
        });
        container.appendChild(Heading);
        // Append the parent div to the container
        container.appendChild(cardContainer);
        loader.style.display = 'none';
    })
    .catch(error => console.error('Error fetching data:', error));
}

AllShipments();
