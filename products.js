document.addEventListener("DOMContentLoaded", function () {
    const APIKEY = "67a2fd3b673edb11eed1d2e9";
    
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://diasoproject-5af3.restdb.io/rest/products",
        "method": "GET",
        "headers": {
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache"
        }
      }
      
      $.ajax(settings).done(function (response) {
        console.log(response);
      });

      fetch("https://diasoproject-5af3.restdb.io/rest/products", settings)
      .then(response => response.json())
      .then(response => {
        let content = "";

        for (var i = 0; i < response.length; i++) {
          content = `${content}<div class="dContIndiv">
            <img src='${response[i].productLink}' alt='${response[i].productName}' width='420' height='auto'>
            <div class="content2desc">
              <a class='ftTitle' href='product.html'>${response[i].productName}</a>
              <p class='Cost'>${formatCurrency(response[i].productPrice)}</p>
            </div>
          </div>`;
        }

        // Update our HTML content
        const productList = document.getElementById("product-list");
        productList.innerHTML = content;
        productList.style.display = "flex";
        productList.style.flexWrap = "wrap";
        productList.style.justifyContent = "left";

        document.getElementById("total-results").innerHTML = response.length;
      });

      function formatCurrency(value) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    }
});
