document.addEventListener("DOMContentLoaded", function () {
  const APIKEY = "67a2fd3b673edb11eed1d2e9";
  const userId = localStorage.getItem("userId");

  if (!userId) {
      console.error("No user ID found in localStorage");
      return;
  }


  const levelElement = document.getElementById('level');

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

        const maxExp = 10;
        let currentLevel = user.level; // Set currentLevel to user's level

        if (currentLevel == null || currentLevel === undefined) {
            currentLevel = 0;
        }
        updateExpBar(currentLevel, maxExp);

    } else {
        alert("User not found.");
    }
    })


    

    levelElement.textContent = `lv.${currentLevel}`;

    function updateExpBar(currentExp, maxExp) {
        let currentActualLevel = Math.floor(currentExp / maxExp);

        let remainderExp = currentExp - currentActualLevel*maxExp;
        const expPercentage = (remainderExp / maxExp) * 100;
        expProgress.style.width = expPercentage + "%";

        level.textContent = `lv.${currentActualLevel}`;
    }





    // function addExperience(exp) {            //example for adding points part one ref for future code in this project.
    //     currentExp += exp;
    //    while (currentExp >= maxExp) {
    //         currentExp -= maxExp;
    //         addedLevel += 1;
    //     }
    //     updateExpBar(currentExp, maxExp);
    //    console.log(`total extra levels to add: ${addedLevel}`);}

    // UPDATE SECTION....
    document.getElementById("update-contact-submit").addEventListener("click", function (e) {
        e.preventDefault();
        // Retrieve all my update form values
        let contactName = document.getElementById("update-username").value;
        let contactBio = document.getElementById("update-bio").value;
        let contactId = localStorage.getItem("userId");

        console.log(contactName);
        console.log(contactBio);
        console.log(contactId);

        // Call our update form function which makes an AJAX call to our RESTDB to update the selected information
        updateForm(contactId, contactName, contactBio);
    });

    function updateForm(_id, username, bio) {
        var jsondata = { "username": username, "bio": bio }; // sets the data for user and bio
        console.log(jsondata);
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://diasoproject-5af3.restdb.io/rest/contact/${_id}",
            "method": "PATCH",
            "headers": {
              "content-type": "application/json",
              "x-apikey": APIKEY,
              "cache-control": "no-cache"
            },
            body: JSON.stringify(jsondata)
          }

        fetch(`https://diasoproject-5af3.restdb.io/rest/contact/${_id}`, settings)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                alert("Profile page updated successfully!");
                location.reload();
            })
            .catch(error => {
                console.error("Error updating contact:", error);
            });
        

    }
});