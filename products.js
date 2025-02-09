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
  };
    
  $.ajax(settings).done(function (response) {
      console.log(response);
  });

  fetch("https://diasoproject-5af3.restdb.io/rest/products", settings)
    .then(response => response.json())
    .then(response => {
      let content = "";

      // Filter products by category initially
      const filteredProducts = response.filter(product => product.productCategory === category);

      // Display filtered products initially
      displayProducts(filteredProducts);

      // Display the count of items
      document.getElementById("total-results").innerHTML = filteredProducts.length;

      // Add event listener to the search bar
      const searchInput = document.querySelector('input[name="search"]');
      searchInput.addEventListener('input', function () {
          const query = searchInput.value.toLowerCase();
          if (query) {
              const searchResults = response.filter(product => product.productName.toLowerCase().includes(query));
              displayProducts(searchResults);
              document.getElementById("total-results").innerHTML = searchResults.length;
          } else {
              // If search input is empty, display filtered products by category
              displayProducts(filteredProducts);
              document.getElementById("total-results").innerHTML = filteredProducts.length;
          }
      });
    });

  function displayProducts(products) {
      const container = document.getElementById('product-list');
      container.innerHTML = ''; // Clear existing content

      products.forEach(product => {
          const productElement = document.createElement('div');
          productElement.classList.add('dContIndiv');
          productElement.innerHTML = `
              <img src="${product.productLink}" alt="${product.productName}" width="420" height="auto">
              <div class="content2desc">
                  <a class="ftTitle" href="product.html">${product.productName}</a>
                  <p class="Cost">${formatCurrency(product.productPrice)}</p>
              </div>
          `;
          container.appendChild(productElement);
                  const productList = document.getElementById("product-list");

        productList.style.display = "flex";
        productList.style.flexWrap = "wrap";
        productList.style.justifyContent = "left";
        productList.style.marginLeft = "50px";
      });
  }

  function formatCurrency(value) {
      return new Intl.NumberFormat('en-SG', { style: 'currency', currency: 'SGD' }).format(value);
  }
});