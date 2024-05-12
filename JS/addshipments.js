// Function to create shipment form
function createShipmentForm() {
    // Clear the container
    container.innerHTML = "";
  
    // Create form element
    const form = document.createElement("form");
    form.id = "shipmentForm";
    form.setAttribute("role", "form"); // Add ARIA role attribute
  
    // Create fieldset element for grouping form fields
    const fieldset = document.createElement("fieldset");
  
    // Create legend element for fieldset
    const legend = document.createElement("legend");
    legend.textContent = "Shipment Details"; // Set legend text
  
    // Create label and input elements for shipment date
    const shipmentDateLabel = document.createElement("label");
    shipmentDateLabel.textContent = "Shipment Date:";
    shipmentDateLabel.setAttribute("for", "shipmentDate"); // Add for attribute
    const shipmentDateInput = document.createElement("input");
    shipmentDateInput.type = "date";
    shipmentDateInput.id = "shipmentDate";
    shipmentDateInput.name = "shipmentDate";
    shipmentDateInput.required = true;
  
    // Create label and input elements for delivery date
    const deliveryDateLabel = document.createElement("label");
    deliveryDateLabel.textContent = "Delivery Date:";
    deliveryDateLabel.setAttribute("for", "deliveryDate"); // Add for attribute
    const deliveryDateInput = document.createElement("input");
    deliveryDateInput.type = "date";
    deliveryDateInput.id = "deliveryDate";
    deliveryDateInput.name = "deliveryDate";
    deliveryDateInput.required = true;
  
    // Create label and input elements for max bid amount
    const maxBidAmountLabel = document.createElement("label");
    maxBidAmountLabel.textContent = "Max Bid Amount:";
    maxBidAmountLabel.setAttribute("for", "maxBidAmount"); // Add for attribute
    const maxBidAmountInput = document.createElement("input");
    maxBidAmountInput.type = "number";
    maxBidAmountInput.id = "maxBidAmount";
    maxBidAmountInput.name = "maxBidAmount";
    maxBidAmountInput.required = true;
  
    const h2UploadImage = document.createElement("h2");
    h2UploadImage.textContent = "Upload Image";
  
    const imageUpload = document.createElement("input");
    imageUpload.type = "file";
    imageUpload.id = "imageUpload";
  
    const OriginAddressForm = document.createElement("form");
    OriginAddressForm.id = "OriginAddressForm";
    OriginAddressForm.setAttribute("role", "form");
  
    const originAddressLegend = document.createElement("legend");
    originAddressLegend.textContent = "Origin Address Details";
  
    const originStreetAddressLabel = createLabel(
      "Street Address:",
      "originStreetAddress"
    );
    const originStreetAddressInput = createInput(
      "text",
      "originStreetAddress",
      "originStreetAddress",
      true
    );
  
    const originCityLabel = createLabel("City:", "originCity");
    const originCityInput = createInput("text", "originCity", "originCity", true);
  
    const originStateLabel = createLabel("State:", "originState");
    const originStateInput = createInput(
      "text",
      "originState",
      "originState",
      true
    );
  
    const originPostalCodeLabel = createLabel("Postal Code:", "originPostalCode");
    const originPostalCodeInput = createInput(
      "number",
      "originPostalCode",
      "originPostalCode",
      true
    );
  
    const DestinationAddressForm = document.createElement("form");
    DestinationAddressForm.id = "DestinationAddressForm";
    DestinationAddressForm.setAttribute("role", "form");
  
    const destinationAddressLegend = document.createElement("legend");
    destinationAddressLegend.textContent = "Destination Address Details";
  
    const destinationStreetAddressLabel = createLabel(
      "Street Address:",
      "destinationStreetAddress"
    );
    const destinationStreetAddressInput = createInput(
      "text",
      "destinationStreetAddress",
      "destinationStreetAddress",
      true
    );
  
    const destinationCityLabel = createLabel("City:", "destinationCity");
    const destinationCityInput = createInput(
      "text",
      "destinationCity",
      "destinationCity",
      true
    );
  
    const destinationStateLabel = createLabel("State:", "destinationState");
    const destinationStateInput = createInput(
      "text",
      "destinationState",
      "destinationState",
      true
    );
  
    const destinationPostalCodeLabel = createLabel(
      "Postal Code:",
      "destinationPostalCode"
    );
    const destinationPostalCodeInput = createInput(
      "number",
      "destinationPostalCode",
      "destinationPostalCode",
      true
    );
  
    const descriptionLabel = document.createElement("label");
    descriptionLabel.textContent = "Description:";
    descriptionLabel.setAttribute("for", "description"); // Add for attribute
    const descriptionInput = document.createElement("textarea");
    descriptionInput.id = "description";
    descriptionInput.name = "description";
    descriptionInput.rows = "4"; 
    descriptionInput.cols = "75"; 
  
    // Repeat the process for the remaining fields...
  
    // Create submit button
    const submitButton = document.createElement("button");
    submitButton.type = "submit"; // Change type to submit to enable form submission
    submitButton.textContent = "Submit";
    submitButton.setAttribute("role", "button"); // Add ARIA role attribute
    submitButton.addEventListener("click", function (event) {
      // Prevent default form submission
      event.preventDefault();
      // Call a function to handle image upload when the submit button is clicked
      submitForm();
    });
  
    // Append label and input elements to the fieldset
    fieldset.appendChild(legend);
    fieldset.appendChild(shipmentDateLabel);
    fieldset.appendChild(shipmentDateInput);
    fieldset.appendChild(document.createElement("br"));
    fieldset.appendChild(deliveryDateLabel);
    fieldset.appendChild(deliveryDateInput);
    fieldset.appendChild(document.createElement("br"));
    fieldset.appendChild(maxBidAmountLabel);
    fieldset.appendChild(maxBidAmountInput);
    fieldset.appendChild(document.createElement("br"));
    fieldset.appendChild(h2UploadImage);
    fieldset.appendChild(imageUpload);
  
    fieldset.appendChild(originAddressLegend);
    fieldset.appendChild(originStreetAddressLabel);
    fieldset.appendChild(originStreetAddressInput);
    fieldset.appendChild(document.createElement("br"));
    fieldset.appendChild(originCityLabel);
    fieldset.appendChild(originCityInput);
    fieldset.appendChild(document.createElement("br"));
    fieldset.appendChild(originStateLabel);
    fieldset.appendChild(originStateInput);
    fieldset.appendChild(document.createElement("br"));
    fieldset.appendChild(originPostalCodeLabel);
    fieldset.appendChild(originPostalCodeInput);
    fieldset.appendChild(document.createElement("br"));
  
    fieldset.appendChild(destinationAddressLegend);
    fieldset.appendChild(destinationStreetAddressLabel);
    fieldset.appendChild(destinationStreetAddressInput);
    fieldset.appendChild(document.createElement("br"));
    fieldset.appendChild(destinationCityLabel);
    fieldset.appendChild(destinationCityInput);
    fieldset.appendChild(document.createElement("br"));
    fieldset.appendChild(destinationStateLabel);
    fieldset.appendChild(destinationStateInput);
    fieldset.appendChild(document.createElement("br"));
    fieldset.appendChild(destinationPostalCodeLabel);
    fieldset.appendChild(destinationPostalCodeInput);
    fieldset.appendChild(document.createElement("br"));
  
    fieldset.appendChild(descriptionLabel);
    fieldset.appendChild(descriptionInput);
    fieldset.appendChild(document.createElement("br"));
  
  
    // Append fieldset and submit button to the form
    form.appendChild(fieldset);
    form.appendChild(submitButton);
  
    // Append form to the container
    container.appendChild(form);
    container.appendChild(OriginAddressForm);
    container.appendChild(DestinationAddressForm);
  }
  
  function submitForm() {
    return new Promise((resolve, reject) => {
      uploadFile()
        .then((image) => {
          // Log the image data
          console.log("Image URL:", image);
  
          // Extract form data
          const shipmentDate = new Date(
            document.getElementById("shipmentDate").value
          ).toISOString();
          const deliveryDate = new Date(
            document.getElementById("deliveryDate").value
          ).toISOString();
          const maxBidAmount = parseFloat(
            document.getElementById("maxBidAmount").value
          ).toFixed(2);
          const originPostalCodeInput =
            document.getElementById("originPostalCode");
          const destinationPostalCodeInput = document.getElementById(
            "destinationPostalCode"
          );
  
          const desc = document.getElementById(
              "description"
            ).value;
  
          // Convert postal codes to numbers
          const originPostalCode = parseInt(originPostalCodeInput.value, 10);
          const destinationPostalCode = parseInt(
            destinationPostalCodeInput.value,
            10
          );
  
          // Check if the postal codes are valid numbers
          if (isNaN(originPostalCode) || isNaN(destinationPostalCode)) {
            console.error("Error: Invalid postal code");
            reject("Invalid postal code");
            return;
          }
  
          // Create form data object
          const formData = {
            shipmentDate: shipmentDate,
            deliveryDate: deliveryDate,
            maxBidAmount: maxBidAmount,
            bidStartTime: "2024-02-19T09:00:00",
            bidEndTime: "2024-02-20T17:00:00",
            imageUrl: image,
            categoryId: 1,
            description: desc,
            shipmentStatus: "pending",
            customerId: 1,
            originAddressId: "",
            destinationAddressId: "",
          };
  
          // Submit origin address data
          submitAddress(
            "OriginAddressForm",
            "originStreetAddress",
            "originCity",
            "originState",
            "originPostalCode"
          )
            .then((originAddressId) => {
              formData.originAddressId = originAddressId;
  
              // Submit destination address data
              submitAddress(
                "DestinationAddressForm",
                "destinationStreetAddress",
                "destinationCity",
                "destinationState",
                "destinationPostalCode"
              )
                .then((destinationAddressId) => {
                  formData.destinationAddressId = destinationAddressId;
  
                  // Now that both addresses are saved, submit shipment data
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
                })
                .catch((error) => {
                  console.error("Error:", error);
                  reject(error);
                });
            })
            .catch((error) => {
              console.error("Error:", error);
              reject(error);
            });
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("An error occurred while submitting the form");
          reject(error);
        });
    });
  }
  
  // function submitForm() {
  //     // Extract form data...
  //     submitAddress("OriginAddressForm",
  //               "originStreetAddress",
  //               "originCity",
  //               "originState",
  //               "originPostalCode")
  //       .then((originAddressId) => {
  //         // Handle origin address submission...
  //         console.log(originAddressId );
  //       })
  //       .catch((error) => {
  //         // Properly handle the rejection
  //         console.error("Error:", error);
  //         alert("An error occurred while submitting the form");
  //       });
  //   }
    
  
  // Function to create label element
  function createLabel(text, htmlFor) {
    const label = document.createElement("label");
    label.textContent = text;
    label.setAttribute("for", htmlFor);
    return label;
  }
  
  // Function to create input element
  function createInput(type, id, name, required) {
    const input = document.createElement("input");
    input.type = type;
    input.id = id;
    input.name = name;
    if (required) {
      input.required = true;
    }
    return input;
  }
  
  // Function to handle image upload
  function uploadFile() {
    return new Promise((resolve, reject) => {
      var fileInput = document.getElementById("imageUpload");
      var file = fileInput.files[0];
      if (!file) {
        document.getElementById("uploadStatus").innerText =
          "Please select a file";
        reject("No file selected");
        return;
      }
  
      var formData = new FormData();
      formData.append("file", file);
  
      fetch("http://54.220.202.86:8080/api/image/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Upload failed");
          }
          return response.text();
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          console.error("Error:", error);
          reject(error);
        });
    });
  }
  function submitAddress(form, address, city, state, postalCode) {
      return new Promise((resolve, reject) => {
        // Create a new FormData object from the provided form
        const formData = new FormData(document.getElementById(form));
    
        // Extract the values from the FormData object
        const addressData = {
          streetAddress: document.getElementById(address)?.value,
          city: document.getElementById(city)?.value,
          state: document.getElementById(state)?.value,
          postalCode: parseInt(document.getElementById(postalCode)?.value),
        };
    console.log(addressData);
        // Check if any of the required fields are null
      //   if (!addressData.streetAddress || !addressData.city || !addressData.state || isNaN(addressData.postalCode)) {
      //     console.error("Error: Incomplete address data");
      //     reject("Incomplete address data");
      //     return;
      //   }
    
        // Convert the address data to JSON
        const jsonData = JSON.stringify(addressData);
    
        // Log the JSON data to verify
        console.log(jsonData);
    
        // Submit the address data to the server
        fetch("http://54.220.202.86:8080/api/addresses/save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: jsonData,
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((savedAddressData) => {
            // Resolve the promise with the saved address data
            resolve(savedAddressData);
          })
          .catch((error) => {
            // Log and reject any errors that occur during the fetch request
            console.error("Error:", error);
            reject(error);
          });
      });
    }