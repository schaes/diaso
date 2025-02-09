const cart = JSON.parse(localStorage.getItem("inCart")) || [];

const cartItems = document.getElementById("cartItems");
const totalPrice = document.getElementById("totalPrice");

let totalAmount = 0;

for (let i = 0; i < cart.length; i++) {
    const newDiv = document.createElement("div"); //creates new div 

    newDiv.classList.add("productSingle"); //adds class to div to style with css later

    const image = document.createElement("img");
    const imageUrl = cart[i].image;
    image.setAttribute("src", imageUrl);

    const title = document.createElement("h5");
    title.textContent = cart[i].name;

    title.textContent += " - " + cart[i].quantity;

    const price = document.createElement("h5");
    const itemPrice = parseFloat(cart[i].price.replace(/[^0-9.-]+/g, "")); //removes sextra symbols, and make sure it's ready to calculate
    const totalPrice = itemPrice * cart[i].quantity;
    price.textContent = "$" + totalPrice.toFixed(2); //calculates total price and rouds up to 2dp

    newDiv.appendChild(image);
    newDiv.appendChild(title);
    newDiv.appendChild(price);

    // Append the new div to the container
    cartItems.appendChild(newDiv);

    totalAmount += totalPrice;

    console.log(cart[i].price);
}

totalPrice.innerHTML = totalAmount.toFixed(2);

console.log(cart);

