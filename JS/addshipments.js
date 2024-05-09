// Function to create shipment form
function createShipmentForm() {
    // Clear the container
    container.innerHTML = "";

    // Create form element
    const form = document.createElement('form');
    form.id = 'shipmentForm';
    form.setAttribute('role', 'form'); // Add ARIA role attribute

    // Create fieldset element for grouping form fields
    const fieldset = document.createElement('fieldset');

    // Create legend element for fieldset
    const legend = document.createElement('legend');
    legend.textContent = 'Shipment Details'; // Set legend text

    // Create label and input elements for shipment date
    const shipmentDateLabel = document.createElement('label');
    shipmentDateLabel.textContent = 'Shipment Date:';
    shipmentDateLabel.setAttribute('for', 'shipmentDate'); // Add for attribute
    const shipmentDateInput = document.createElement('input');
    shipmentDateInput.type = 'date';
    shipmentDateInput.id = 'shipmentDate';
    shipmentDateInput.name = 'shipmentDate';
    shipmentDateInput.required = true;

    // Create label and input elements for delivery date
    const deliveryDateLabel = document.createElement('label');
    deliveryDateLabel.textContent = 'Delivery Date:';
    deliveryDateLabel.setAttribute('for', 'deliveryDate'); // Add for attribute
    const deliveryDateInput = document.createElement('input');
    deliveryDateInput.type = 'date';
    deliveryDateInput.id = 'deliveryDate';
    deliveryDateInput.name = 'deliveryDate';
    deliveryDateInput.required = true;

    // Create label and input elements for max bid amount
    const maxBidAmountLabel = document.createElement('label');
    maxBidAmountLabel.textContent = 'Max Bid Amount:';
    maxBidAmountLabel.setAttribute('for', 'maxBidAmount'); // Add for attribute
    const maxBidAmountInput = document.createElement('input');
    maxBidAmountInput.type = 'number';
    maxBidAmountInput.id = 'maxBidAmount';
    maxBidAmountInput.name = 'maxBidAmount';
    maxBidAmountInput.required = true;

    const h2UploadImage = document.createElement('h2');
    h2UploadImage.textContent = 'Upload Image';
 
    const imageUpload = document.createElement('input');
    imageUpload.type = 'file';
    imageUpload.id = 'imageUpload';
 
    // Repeat the process for the remaining fields...

    // Create submit button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit'; // Change type to submit to enable form submission
    submitButton.textContent = 'Submit';
    submitButton.setAttribute('role', 'button'); // Add ARIA role attribute
    submitButton.addEventListener('click', function(event) {
        // Prevent default form submission
        event.preventDefault();
        // Call a function to handle image upload when the submit button is clicked
        submitForm();
    });

    // Append label and input elements to the fieldset
    fieldset.appendChild(legend);
    fieldset.appendChild(shipmentDateLabel);
    fieldset.appendChild(shipmentDateInput);
    fieldset.appendChild(document.createElement('br'));
    fieldset.appendChild(deliveryDateLabel);
    fieldset.appendChild(deliveryDateInput);
    fieldset.appendChild(document.createElement('br'));
    fieldset.appendChild(maxBidAmountLabel);
    fieldset.appendChild(maxBidAmountInput);
    fieldset.appendChild(document.createElement('br'));
    fieldset.appendChild(h2UploadImage);
    fieldset.appendChild(imageUpload);
    // Append fieldset and submit button to the form
    form.appendChild(fieldset);
    form.appendChild(submitButton);

    // Append form to the container
    container.appendChild(form);
}

function submitForm() {
    return new Promise((resolve, reject) => {
        uploadFile()
            .then(image => {
                // Log the image data
                console.log("nvoernvouwuvn;uhrwu0efds",image);

                // Proceed with other actions
                // Example: Send formData to the server using fetch API
                const formData = {
                    "shipmentDate": new Date(document.getElementById("shipmentDate").value).toISOString(),
                    "deliveryDate": new Date(document.getElementById("deliveryDate").value).toISOString(),
                    "maxBidAmount": parseFloat(document.getElementById("maxBidAmount").value).toFixed(2),
                    "bidStartTime": "2024-02-19T09:00:00",
                    "bidEndTime": "2024-02-20T17:00:00",
                    "imageUrl": image,
                    "originAddressId": 1,
                    "destinationAddressId": 2,
                    "categoryId": 1,
                    "description": "urgent",
                    "shipmentStatus": "pending",
                    "customerId": 1
                };
                
console.log(formData);
                fetch('http://54.220.202.86:8080/api/shipments/save', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                .then(response => {
                    if (response.ok) {
                        alert('Shipment created successfully!');
                        // Optionally, you can redirect the user or perform other actions
                        resolve();
                    } else {
                        throw new Error('Error creating shipment');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Error creating shipment');
                    reject(error);
                });

                console.log("JBC KJEGKEB");
                resolve(); // Resolve the Promise once all operations are done
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while submitting the form');
                reject(error);
            });
    });
}


// Call createShipmentForm function to create the form
// createShipmentForm();
function uploadFile() {
    return new Promise((resolve, reject) => {
        var fileInput = document.getElementById('imageUpload');
        var file =  fileInput.files[0];
        if (!file) {
            document.getElementById('uploadStatus').innerText = 'Please select a file';
            reject('No file selected');
            return;
        }
      
        var formData = new FormData();
        formData.append('file', file);
      
        fetch('http://54.220.202.86:8080/api/image/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Upload failed');
            }
            return response.text();
        })
        .then(data => {
            // document.getElementById('uploadStatus').innerText = data;
            resolve(data); // Resolve with the uploaded data
        })
        .catch(error => {
            console.error('Error:', error);
            // document.getElementById('uploadStatus').innerText = 'Error occurred. Please try again.';
            reject(error); // Reject with the error
        });
    });
}

// Handle image upload
// document.getElementById('uploadBtn').addEventListener('click', function () {
//     const imageFile = imageUpload.files[0];
//     if (!imageFile) {
//         alert('Please select an image file.');
//         return;
//     }
// });