const container = document.getElementById('cards-container');
const apiUrl = 'http://54.220.202.86:8080/api/shipments/getdata';


function AllShipments() {
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
            cardContainer.appendChild(card);
        });
        container.appendChild(Heading);
        // Append the parent div to the container
        container.appendChild(cardContainer);
    })
    .catch(error => console.error('Error fetching data:', error));
}


