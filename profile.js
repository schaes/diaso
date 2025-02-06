document.addEventListener("DOMContentLoaded", function () {
    const APIKEY = "67a2fd3b673edb11eed1d2e9";

    let userId = localStorage.getItem("username");

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://diasoproject-5af3.restdb.io/rest/contact",
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
        
    
    
    
    let currentLevel = 1;
    const currentExp = 13; // to be replaced with number of items bought
    const maxExp = 10;

    const expPercentage = (currentExp / maxExp) * 100;
    const expProgress = document.getElementById("expProgress");
    expProgress.style.width = expPercentage + "%";

    const levelDisplay = document.querySelector("#expBar span");
    levelDisplay.textContent = `lvl ${currentLevel}`;

    function addExperience(exp) {
        currentExp += exp;
        while (currentExp >= maxExp) {
            currentExp -= maxExp;
            maxExp+=5;
            currentLevel+=1;
        }
        updateExpBar();
        console.log(`Current level: ${currentLevel}`);
    }
});