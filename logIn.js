document.addEventListener("DOMContentLoaded", function () {
    const APIKEY = "67a2fd3b673edb11eed1d2e9";
    document.getElementById("login-submit").addEventListener("click", function (e) {
        e.preventDefault();
    
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;

        let settings = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache"
            }
        };

        fetch("https://diasoproject-5af3.restdb.io/rest/contact", settings)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                let validUser = false;
                for (let i = 0; i < data.length; i++) {
                    if (data[i].username === username && data[i].password === password) {
                        validUser = true;
                        break;
                    }
                }
                if (validUser) {
                    window.location.href = "content1.html";
                } else {
                    alert("Invalid username or password, please try again :(");
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    });
});