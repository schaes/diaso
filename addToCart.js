//Add items to cart (stored in local storage for later use)

let item = document.getElementById("productName").innerHTML;
let quantity = document.getElementById("counter").innerHTML;
let cart = JSON.parse(localStorage.getItem("inCart")) || []; // get previous items, or makes a new array


document.getElementById("addToCart").addEventListener("click", function() {
    myFunction(item, quantity);
  }); //Button press to run function


function myFunction(a, b) {
    if (typeof(Storage) !== "undefined") { //checks to see if the browser supports local storage
        cart.push([a, b]);

        localStorage.setItem("inCart", JSON.stringify(cart)); //makes items in cart into a sting to be stored

        //document.getElementById("check1").innerHTML = JSON.stringify(cart);
        document.getElementById("check").innerHTML = "Item(s) added to cart!"; //Notifies user of added item
      } else {
        document.getElementById("check").innerHTML = "Sorry, your browser does not support web storage...";
      }
}

console.log(cart)

//before refine
/*let item = document.getElementById("productName").innerHTML;
let quantity = document.getElementById("counter").innerHTML;
let cart = []; 
let product = [];


document.getElementById("addToCart").addEventListener("click", function() {
    myFunction(item, quantity);
  }); //Button press to run function


function myFunction(a, b) {
    if (typeof(Storage) !== "undefined") { //checks to see if the browser supports local storage
        product = [item, quantity]; //adds the product as well as quantity into an array to be added into cart later on
        cart.push(product);

        //storing products in local storage to be accessed later
        localStorage.setItem("inCart", cart);

        document.getElementById("demo1").innerHTML = localStorage.getItem("inCart");
        document.getElementById("demo").innerHTML = "Item(s) added to cart!";
      } else {
        document.getElementById("demo").innerHTML = "Sorry, your browser does not support web storage...";
      }
}

console.log(cart)*/


//counter for quantity
let minus = document.getElementById("decrement");
let plus = document.getElementById("increment");

let quantityNum = 1;

minus.addEventListener("click", () => {
	quantity -= 1;
});

plus.addEventListener("click", () => {
	quantity += 1;
});

