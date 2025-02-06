document.addEventListener("DOMContentLoaded", function () {
  const APIKEY = "67a2fd3b673edb11eed1d2e9";
  const userId = localStorage.getItem("userId");

  if (!userId) {
      console.error("No user ID found in localStorage");
      return;
  }

  const usrnmProfileDisplay = document.getElementById("usrnmProfile");
  const biographyDiv = document.getElementById("bio");
  const levelElement = document.getElementById('level');
  const levelDisplay = document.querySelector("#expBar span");
  const expProgress = document.getElementById("expProgress");

  var settings = {
      "async": true,
      "crossDomain": true,
      "url": `https://diasoproject-5af3.restdb.io/rest/contact?q={"_id":"${userId}"}`,
      "method": "GET",
      "headers": {
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache"
      }
  };

  // Fetch user data
  $.ajax(settings).done(function (response) {
      if (response.length > 0) {
          const user = response[0]; // Access the first element of the array
          console.log(user);

          usrnmProfile.textContent = user.username;
          biography.textContent = user.bio|| "No bio available.";

          const currentExp = user.currentExp;
          const maxExp = user.maxExp;
          let currentLevel = user.level; // Set currentLevel to user's level
          const expInProgressBar = currentExp % maxExp;

          levelElement.textContent = `lv.${currentLevel}`;
          updateExpBar(expInProgressBar, maxExp);

          levelDisplay.textContent = `lv.${currentLevel}`;
      } else {
          alert("User not found.");
      }
  })

  function updateExpBar(currentExp, maxExp) {
      const expPercentage = (currentExp / maxExp) * 100;
      expProgress.style.width = expPercentage + "%";
  }

  // Initialize user level and experience
  let addedLevel = 0; // to be changed to user's level
  let currentExp = 5; // to be replaced with number of items bought
  const maxExp = 10;

  function addExperience(exp) {
      currentExp += exp;
      while (currentExp >= maxExp) {
          currentExp -= maxExp;
          addedLevel += 1;
      }
      updateExpBar(currentExp, maxExp);
      console.log(`total extra levels to add: ${addedLevel}`);
  }

  // Example usage of addExperience
  addExperience(10); // Add 10 experience points
});