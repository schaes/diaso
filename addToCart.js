//Add items to cart (stored in local storage for later use)

let item = document.getElementById("productName").innerHTML;
let quantityNum = 1;

//counter for quantity
let minus = document.getElementById("decrement");
let plus = document.getElementById("increment");


minus.addEventListener("click", () => {
	quantityNum -= 1;
	if (quantityNum < 1) quantityNum = 1; // qunatity does not go below one
	document.getElementById("counter").innerHTML = quantityNum;
});

plus.addEventListener("click", () => {
	quantityNum += 1;
	document.getElementById("counter").innerHTML = quantityNum;
});
//end

let cart = JSON.parse(localStorage.getItem("inCart")) || []; // get previous items in cart, or makes a new array

document.getElementById("addToCart").addEventListener("click", function() {
  myFunction(item, quantityNum);
  }); //Button press to run function


function myFunction(a, b) {
    if (typeof(Storage) !== "undefined") { //checks to see if the browser supports local storage
      let existingItem = cart.find(item => item.name === a); //checks if item is already in cart
        
      if (existingItem) {
          existingItem.quantity += b; //adds the quantity to original quantity if it aleady is in the cart
      } else {

          cart.push({name: a, quantity: b});
      }

      // Save the updated cart back to localStorage
      localStorage.setItem("inCart", JSON.stringify(cart));

      // Notify the user
      document.getElementById("check").innerHTML = "Item(s) added to cart!";
  } else {
      document.getElementById("check").innerHTML = "Sorry, your browser does not support web storage...";
  }
}


console.log(cart)

