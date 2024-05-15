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
                        <h1>Shipment Details</h1>
                        <div class="shipment-id">
                        <div class="imageid">
                        <img src="${data.shipment.imageUrl}" alt="Uploaded Image" class="shipment-image-id">
                        </div>
                        <div class="shipment-details">
                        <p><span>PickUp Date:</span>${data.shipment.shipmentDate}</p>
                    <p><span>Delivery Date:</span>${data.shipment.deliveryDate}</p>
                    <p><span>Max Bid Amount:</span> ${data.shipment.maxBidAmount}</p>
                    <p><span>Pickup Address:</span> ${data.originAddress.streetAddress} ${data.originAddress.city} ${data.originAddress.state}</p>
                  
                    <p><span>Delivery Address:</span> ${data.destinationAddress.streetAddress} ${data.destinationAddress.city} ${data.destinationAddress.state}</p>
                    </div>
                    </div>
                    <div class="bid-details">
                        <p>Last Bid: ${bids.length > 0 ? bids[bids.length - 1].bidAmount : 'No bids yet'}</p>
                        <h3>New Bid</h3>
                        <input type="number" id="bidAmount" placeholder="Enter Bid Amount" min="0"> <!-- Set min attribute to 0 -->
                        <button type="submit" onclick="submitBid('${data.shipment.shipmentId}', document.getElementById('bidAmount').value)" ${lastBidAmount > 0 ? `` : `disabled`}>Bid</button>
                        </div>
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
