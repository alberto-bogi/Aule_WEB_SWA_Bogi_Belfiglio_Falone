$(document).ready(function () {
    var count = 0;
    var timer = setInterval(function () {
        count++;
    }, 60000);
    if (sessionStorage.getItem("token")) {
        if (count === 30) {
            $.ajax({
                url: 'rest/auth/refresh',
                type: 'GET',
                success: function (response) {
                    var newToken = response; //mi salvo il nuovo token dalla response
                    sessionStorage.removeItem("authToken");
                    sessionStorage.setItem("newToken", response);
                    location.reload();
                },
                error: function (request, status, error) {
                    handleError(request, status, error, "Errore in fase di refresh del token.");

                }
            });
        }
    }

    $("#button_access").click(function () {

        var username = $("#username").val();
        var password = $("#password").val();

        //oggetto dati da inviare al server
        var formData = {
            username: username,
            password: password
        };

        $.ajax({
            url: 'rest/auth/login',
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded',
            data: formData,
            success: function (response) {
                $("#button_access").hide();
                $("#button_logout").show();
                var authToken = response;

                sessionStorage.setItem("authToken", response);
                location.reload();
            },
            error: function () {
                alert("Username e/o Password errati.");
            }
        });
    });

    $("#button_logout").click(function () {
        $.ajax({
            url: 'rest/auth/logout',
            type: 'DELETE',
            success: function () {
                sessionStorage.removeItem("authToken");
                alert("Logout effettuato con successo.");
                location.reload();
            },
            error: function (request, status, error) {
                handleError(request, status, error, "", "Errore in fase di logout.");
            }
        });
    });



});


