document.querySelector('.navbar-toggle').addEventListener('click', function() {
    console.log('Hamburger clicked'); 
    document.querySelector('.navbar-menu').classList.toggle('active');
});




const container = document.getElementById('cards-container');
const apiUrl = 'http://54.220.202.86:8080/api/shipments/getdata';

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
         
        } else {
            console.error('Failed to place bid');
        
        }
    })
    .catch(error => console.error('Error placing bid:', error));
}


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
                    console.log(data);
                    console.log(bids);
                    container.innerHTML = "";
                    const card = document.createElement('div');
                    card.classList.add('shipment-card-id');
                    card.innerHTML  = `
                        <h2>Shipment Details</h2>
                        <img src="${data.shipment.imageUrl}" alt="Uploaded Image" width="460" height="345" class="shipment-image-id">
                        <p><span>Delivery Date:</span>${data.shipment.deliveryDate}</p>
                    <p><span>Max Bid Amount:</span> ${data.shipment.maxBidAmount}</p>
                    <p><span>Pickup Address:</span> ${data.originAddress.streetAddress} ${data.originAddress.city} ${data.originAddress.state}</p>
                    <p><span>Delivery Address:</span> ${data.destinationAddress.streetAddress} ${data.destinationAddress.city} ${data.destinationAddress.state}</p>
                        <p><span>Last Bid:</span> ${bids.length > 0 ? bids[bids.length - 1].bidAmount : 'No bids yet'}</p>
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

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        container.innerHTML = ""
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('container-card'); 
        const Heading = document.createElement('h1'); 
        Heading.classList.add('heading');
        Heading.innerHTML = `Shipments`
        data.map(shipment => {
            const card = document.createElement('div');
            card.classList.add('shipment-card');
            card.innerHTML = `
                <a>
                <img src="${shipment.shipment.imageUrl}" alt="Uploaded Image" width="460" height="345">
                <p><span>PickUp Date:</span>${shipment.shipment.shipmentDate}</p>
                <p><span>Delivery Date:</span>${shipment.shipment.deliveryDate}</p>
                <p><span>Max Bid Amount:</span> ${shipment.shipment.maxBidAmount}</p>                 
                </a>`;

                card.addEventListener('click', () => {
                    handleCardClick(shipment.shipment.shipmentId);
                });
       
            cardContainer.appendChild(card);
        });
        container.appendChild(Heading);
  
        container.appendChild(cardContainer);
    })
    .catch(error => console.error('Error fetching data:', error));
}

AllShipments();
