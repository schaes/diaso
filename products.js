document.addEventListener("DOMContentLoaded", function () {
    const APIKEY = "67a2fd3b673edb11eed1d2e9";
    
    function getUrlParameter(name) {
      name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
      const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
      const results = regex.exec(location.search);
      return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    const category = getUrlParameter('category');
    console.log('Category:', category); 
    document.getElementById("category").textContent = category || "Search";

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

        // to filter products by category
        const filteredProducts = response.filter(product => product.productCategory === category);     

        for (var i = 0; i < filteredProducts.length; i++) {
          content = `${content}<div class="dContIndiv">
            <img src='${filteredProducts[i].productLink}' alt='${filteredProducts[i].productName}' width='420' height='auto'>
            <div class="content2desc">
              <a class='ftTitle' href='product.html'>${filteredProducts[i].productName}</a>
              <p class='Cost'>${formatCurrency(filteredProducts[i].productPrice)}</p>
            </div>
          </div>`;
        }

        // to update HTML content
        const productList = document.getElementById("product-list");
        productList.innerHTML = content;
        productList.style.display = "flex";
        productList.style.flexWrap = "wrap";
        productList.style.justifyContent = "left";
        productList.style.marginLeft = "50px";

        document.getElementById("total-results").innerHTML = filteredProducts.length;
      });

      function formatCurrency(value) {
        return new Intl.NumberFormat('en-SG', { style: 'currency', currency: 'SGD' }).format(value);
    }
});
