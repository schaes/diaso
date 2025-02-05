document.addEventListener("DOMContentLoaded", function () {
  const APIKEY = "67a2fd3b673edb11eed1d2e9";
  document.getElementById("contact-submit").addEventListener("click", function (e) {
    e.preventDefault();

    // Retrieve form data
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    // Validate form data
    if (password !== confirmPassword) {
      alert("Password does not match, please try again :( ");
      return;
    }

    let jsondata = {
      "username": username,
      "password": password
    };

    // Disable the submit button and reset the form
    document.getElementById("contact-submit").disabled = true;
    document.getElementById("add-contact-form").reset();

    let settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-apikey": APIKEY,
        "Cache-Control": "no-cache"
      },
      body: JSON.stringify(jsondata)
    };

    fetch("https://diasoproject-5af3.restdb.io/rest/contact", settings)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        document.getElementById("contact-submit").disabled = false;
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        document.getElementById("contact-submit").disabled = false;
      });
  });
});