function clickCounter() {
    if (typeof(Storage) !== "undefined") {
      if (localStorage.clickcount) {
        localStorage.clickcount = Number(localStorage.clickcount)+1;
      } else {
        localStorage.clickcount = 1;
      }
      document.getElementById("result").innerHTML = localStorage.clickcount;
    } else {
      document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
    }
  }

  document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("increment").addEventListener(
        "click", // when the button is clicked,
        incrementCounter // the updateCounter() function will be called
    )
    document.getElementById("decrement").addEventListener(
        "click", // when the button is clicked,
        decrementCounter // the updateCounter() function will be called
    )
  })