
document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault(); 
    const APIKEY = "677c88b7202b14c85010135b";
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
      alert("Passwords don't match, please try again :( ");
      return;
    }
  
    let jsondata = {
      "username": username,
      "password": password
    };

    let settings = {
        method: "POST", //[cher] we will use post to send info
        headers: {
          "Content-Type": "application/json",
          "x-apikey": APIKEY,
          "Cache-Control": "no-cache"
        },
        body: JSON.stringify(jsondata),
        beforeSend: function () {
          //@TODO use loading bar instead
          // Disable our button or show loading bar
          document.getElementById("contact-submit").disabled = true;
          // Clear our form using the form ID and triggering its reset feature
          document.getElementById("add-contact-form").reset();
        }
      }

    //[STEP 5]: Send our AJAX request over to the DB and print response of the RESTDB storage to console.
    fetch("https://interactivedev-a7c9.restdb.io/rest/contact", settings)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      document.getElementById("contact-submit").disabled = false;
      //@TODO update frontend UI 
      document.getElementById("add-update-msg").style.display = "block";
      setTimeout(function () {
        document.getElementById("add-update-msg").style.display = "none";
      }, 3000);
      // Update our table 
      getContacts();
    });
});