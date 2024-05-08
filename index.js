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



function addShipments() {
    const app = document.getElementById('cards-container');
app.innerHTML=""
    // Create elements
    const h2SelectCategory = document.createElement('h2');
    h2SelectCategory.textContent = 'Select Category';

    const categorySelect = document.createElement('select');
    categorySelect.id = 'categorySelect';

    const h2UploadImage = document.createElement('h2');
    h2UploadImage.textContent = 'Upload Image';

    const imageUpload = document.createElement('input');
    imageUpload.type = 'file';
    imageUpload.id = 'imageUpload';

    const h2ShipmentFields = document.createElement('h2');
    h2ShipmentFields.textContent = 'Shipment Details';

    const inputName = createInput('Name');
    const inputQuantity = createInput('Quantity', 'number');
    const inputDescription = createInput('Description', 'textarea');
    const inputAddress = createInput('Address');
    const inputTime = createInput('Time');
    const inputDate = createInput('Date', 'date');

    const uploadBtn = document.createElement('button');
    uploadBtn.textContent = 'Upload';
    uploadBtn.id = 'uploadBtn';

    const addShipmentBtn = document.createElement('button');
    addShipmentBtn.textContent = 'Add Shipment';
    addShipmentBtn.id = 'addShipmentBtn';

    // Append elements to app div
    app.appendChild(h2SelectCategory);
    app.appendChild(categorySelect);
    app.appendChild(h2UploadImage);
    app.appendChild(imageUpload);
    app.appendChild(h2ShipmentFields);
    app.appendChild(inputName);
    app.appendChild(inputQuantity);
    app.appendChild(inputDescription);
    app.appendChild(inputAddress);
    app.appendChild(inputTime);
    app.appendChild(inputDate);
    app.appendChild(uploadBtn);
    app.appendChild(addShipmentBtn);

    // Fetch categories from API
    fetch('http://54.220.202.86:8080/api/categories/getdata')
        .then(response => response.json())
        .then(categories => {
            categories.forEach(category => {
                const option = document.createElement('option');
                option.textContent = category.categoryName;
                categorySelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching categories:', error));

    // Handle image upload
    document.getElementById('uploadBtn').addEventListener('click', function () {
        const imageFile = imageUpload.files[0];
        if (!imageFile) {
            alert('Please select an image file.');
            return;
        }

        const formData = new FormData();
        formData.append('image', imageFile);

        fetch('http://54.220.202.86:8080/api/image/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(imageUrl => {
            sessionStorage.setItem('imageUrl', imageUrl);
            alert('Image uploaded successfully.');
        })
        .catch(error => {
            console.error('Error uploading image:', error);
            alert('Error uploading image. Please try again.');
        });
    });

    // Handle shipment addition
    document.getElementById('addShipmentBtn').addEventListener('click', function () {
        const selectedCategory = categorySelect.value;
        const imageUrl = sessionStorage.getItem('imageUrl');
        const name = inputName.value.trim();
        const quantity = inputQuantity.value.trim();
        const description = inputDescription.value.trim();
        const address = inputAddress.value.trim();
        const time = inputTime.value.trim();
        const date = inputDate.value.trim();

        if (!selectedCategory || !imageUrl || !name || !quantity || !description || !address || !time || !date) {
            alert('Please fill in all fields and upload an image first.');
            return;
        }

        const shipmentData = {
            category_id: selectedCategory,
            image_url: imageUrl,
            name: name,
            quantity: quantity,
            description: description,
            address: address,
            time: time,
            date: date
        };

        fetch('http://54.220.202.86:8080/api/shipments/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(shipmentData)
        })
        .then(response => response.json())
        .then(result => {
            console.log('Shipment added successfully:', result);
            alert('Shipment added successfully.');
        })
        .catch(error => {
            console.error('Error adding shipment:', error);
            alert('Error adding shipment. Please try again.');
        });
    });

    // Function to create input elements
    function createInput(labelText, type = 'text') {
        const label = document.createElement('label');
        label.textContent = labelText;

        const input = document.createElement(type === 'textarea' ? 'textarea' : 'input');
        input.type = type;
        input.placeholder = labelText;
        
        const container = document.createElement('div');
        container.appendChild(label);
        container.appendChild(input);
        
        return container;
    }
};

