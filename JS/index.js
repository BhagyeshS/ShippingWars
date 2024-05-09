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
            <img src="${data.shipment.imageUrl}" alt="Uploaded Image">
            <p>Shipment ID: ${data.shipment.shipmentId}</p>
            <p>Bid Amount: ${data.shipment.maxBidAmount}</p>
            <p>Status: ${data.shipment.bidStartTime}</p>
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
                <img src="${shipment.shipment.imageUrl}" alt="Uploaded Image">
                    <h3>${shipment.shipment.shipmentId}</h3>
                    <p>Bid Amount: ${shipment.shipment.maxBidAmount}</p>
                    <p>Status: ${shipment.shipment.bidStartTime}</p>
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



// JavaScript code for the single-page application

function addShipments() {
    const appDiv = document.getElementById('cards-container');

    // Fetch categories and populate the select element
    fetch('http://54.220.202.86:8080/api/categories/getdata')
        .then(response => response.json())
        .then(categories => {
            const categoryOptions = categories.map(category => `<option value="${category.categoryId}">${category.categoryName}</option>`).join('');
            const formHtml = `
                <h1>Add Shipment</h1>
                <form id="add-shipment-form">
                    <label for="category">Category:</label>
                    <select id="category" name="category" required>
                        ${categoryOptions}
                    </select><br>
        
                    <label for="image">Image:</label>
                    <input type="file" id="image" name="image" accept="image/*" required><br>
        
                    <label for="shipmentId">Shipment ID:</label>
                    <input type="text" id="shipmentId" name="shipmentId" required><br>
        
                    <label for="maxBidAmount">Max Bid Amount:</label>
                    <input type="text" id="maxBidAmount" name="maxBidAmount" required><br>
        
                    <label for="bidStartTime">Bid Start Time:</label>
                    <input type="text" id="bidStartTime" name="bidStartTime" required><br>
        
                    <button type="submit">Add Shipment</button>
                </form>
            `;
            appDiv.innerHTML = formHtml;
        })
        .catch(error => console.error('Error fetching categories:', error));

    // Form submission handler
    appDiv.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        // Upload image
        fetch('http://54.220.202.86:8080/api/image/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(imageData => {
            // Add shipment with image URL
            const shipmentData = {
                category: formData.get('category'),
                imageUrl: imageData.url,
                shipmentId: formData.get('shipmentId'),
                maxBidAmount: formData.get('maxBidAmount'),
                bidStartTime: formData.get('bidStartTime')
            };

            // Add shipment
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
                alert('Shipment added successfully!');
                // Reset the form
                event.target.reset();
            })
            .catch(error => console.error('Error adding shipment:', error));
        })
        .catch(error => console.error('Error uploading image:', error));
    });
};
