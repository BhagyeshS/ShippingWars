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


function addShipment(shipmentData) {
    fetch('http://54.220.202.86:8080/api/shipments/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(shipmentData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to add shipment');
        }
        return response.json();
    })
    .then(data => {
        console.log('Shipment added successfully:', data);
        // You can handle the response data as needed
        // For example, you might want to display a success message or update the UI
        // Here you can call the function to fetch all shipments again to update the UI
        AllShipments();
    })
    .catch(error => {
        console.error('Error adding shipment:', error);
        // Handle the error, show an error message, etc.
    });
}

function createShipmentForm() {
    const formContainer = document.createElement('div');
    formContainer.classList.add('shipment-form');
    console.log("guftf7tf")

    const form = document.createElement('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission behavior
        const formData = new FormData(form);
        const shipmentData = {};
        formData.forEach((value, key) => {
            shipmentData[key] = value;
        });
        addShipment(shipmentData);
    });
    container.innerHTML=""
    const shipmentIdInput = document.createElement('input');
    shipmentIdInput.setAttribute('type', 'text');
    shipmentIdInput.setAttribute('name', 'shipmentId');
    shipmentIdInput.setAttribute('placeholder', 'Shipment ID');
    form.appendChild(shipmentIdInput);

    const maxBidAmountInput = document.createElement('input');
    maxBidAmountInput.setAttribute('type', 'number');
    maxBidAmountInput.setAttribute('name', 'maxBidAmount');
    maxBidAmountInput.setAttribute('placeholder', 'Max Bid Amount');
    form.appendChild(maxBidAmountInput);

    const bidStartTimeInput = document.createElement('input');
    bidStartTimeInput.setAttribute('type', 'datetime-local');
    bidStartTimeInput.setAttribute('name', 'bidStartTime');
    form.appendChild(bidStartTimeInput);

    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.textContent = 'Add Shipment';
    form.appendChild(submitButton);

    formContainer.appendChild(form);
    container.appendChild(formContainer);
}
