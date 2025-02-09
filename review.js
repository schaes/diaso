document.addEventListener("DOMContentLoaded", function () {
    const APIKEY = "67a2fd3b673edb11eed1d2e9";
    getReviews();
    document.getElementById("update-review-container").style.display = "none";
    document.getElementById("add-update-msg").style.display = "none";

    document.getElementById("review-submit").addEventListener("click", function (e) {
        e.preventDefault();

        let reviewNickname = document.getElementById("review-nickname").value;
        let reviewMessage = document.getElementById("review-msg").value;

        let jsondata = {
            "nickname": reviewNickname,
            "review": reviewMessage
        };

        let settings = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsondata)
        }

        fetch("https://diasoproject-5af3.restdb.io/rest/review", settings)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                document.getElementById("review-submit").disabled = false;
                document.getElementById("add-update-msg").style.display = "block";
                setTimeout(function () {
                    document.getElementById("add-update-msg").style.display = "none";
                }, 3000);
                getReviews();  // Call to get reviews after submission
            });
    });

    function getReviews(limit = 10, all = true) {
        let settings = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache"
            },
        }

        fetch("https://diasoproject-5af3.restdb.io/rest/review", settings)
            .then(response => response.json())
            .then(response => {
                let content = "";

                for (var i = 0; i < response.length && i < limit; i++) {
                    content += `<div id='${response[i]._id}'>
                    <h4>${response[i].nickname}</h4>
                    <p>${response[i].review}</p>
                    </div>`;
            }

            // Update the reviews container
            document.getElementById("other-reviews").innerHTML = content;
            });
    }

    document.getElementById("update-review-submit").addEventListener("click", function (e) {
        e.preventDefault();

        let reviewNickname = document.getElementById("update-review-nickname").value;
        let reviewMessage = document.getElementById("update-review-msg").value;
        let reviewId = document.getElementById("update-review-id").value;

        updateForm(reviewId, reviewNickname, reviewMessage);
    });

    function updateForm(id, reviewNickname, reviewMessage) {
        var jsondata = { "nickname": reviewNickname, "review": reviewMessage };
        var settings = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsondata)
        }

        fetch(`https://diasoproject-5af3.restdb.io/rest/review/${id}`, settings)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                document.getElementById("update-review-container").style.display = "none";
                getReviews();  // Reload reviews after update
            });
    }

});
