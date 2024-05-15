function home(){
const transportOptions = [
    {
        mode: "Bus",
        image: "bus.png",
        info: "A convenient and affordable mode of transportation for short to medium distances."
    },
    {
        mode: "Train",
        image: "train.png",
        info: "An efficient mode of transportation for medium to long distances with fixed routes."
    },
    {
        mode: "Car",
        image: "car.png",
        info: "Flexible mode of transportation offering convenience and comfort for individual or group travel."
    }
];

const transportOptionsContainer = document.getElementById("cards-container");

transportOptions.forEach(option => {
    const optionDiv = document.createElement("div");
    optionDiv.classList.add("transport-option");

    const image = document.createElement("img");
    image.src = option.image;
    image.alt = option.mode;

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("transport-info");

    const title = document.createElement("h2");
    title.textContent = option.mode;

    const description = document.createElement("p");
    description.textContent = option.info;

    infoDiv.appendChild(title);
    infoDiv.appendChild(description);

    const button = document.createElement("button");
    button.classList.add("btn");
    button.textContent = "Book Now";

    optionDiv.appendChild(image);
    optionDiv.appendChild(infoDiv);
    optionDiv.appendChild(button);

    transportOptionsContainer.appendChild(optionDiv);
});
}
home();