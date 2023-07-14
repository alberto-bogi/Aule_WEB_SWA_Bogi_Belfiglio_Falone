$(document).ready(function () {

    if (sessionStorage.getItem("authToken")) {
        let count = 0;
        let refresh_time = 30;
        let timer = setInterval(function () {
            count++;
            //alert(count);
            if (count === refresh_time) {
                refresh_time += 30;
                //alert("aggiornato il refresh_time");
                $.ajax({
                    url: 'rest/auth/refresh',
                    type: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + sessionStorage.getItem("authToken")
                    },
                    contentType: 'application/x-www-form-urlencoded',
                    success: function (response) {
                        let authToken = response; //mi salvo il nuovo token dalla response
                        sessionStorage.removeItem("authToken");
                        sessionStorage.setItem("authToken", response);
                        //alert("Token cambiato con successo!");

                        location.reload();
                    },
                    error: function (request, status, error) {
                        handleError(request, status, error, "Errore in fase di refresh del token.");

                    }
                });
            }
        }, 60000);


    }


    $("#button_access").click(function () {
        let form = document.forms["loginForm"];
        let username = form.elements["username"].value;
        let password = form.elements["password"].value;

        //oggetto dati da inviare al server
        let formData = {
            username: username,
            password: password
        };

        $.ajax({
            url: 'rest/auth/login',
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded',
            data: formData,
            success: function (response) {
                let token = response;
                sessionStorage.setItem("authToken", response);

                location.reload();
            },
            error: function () {
                alert("Username e/o Password errati.");
            }
        });
    });

});

function logout() {
    $.ajax({
        url: 'rest/auth/logout',
        type: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("authToken")
        },
        success: function () {
            if (sessionStorage.getItem("authToken") !== null) {
                sessionStorage.removeItem("authToken");
            } else if (sessionStorage.getItem("newToken") !== null) {
                sessionStorage.removeItem("newToken");
            }

            alert("Logout effettuato con successo.");
            location.reload();
        },
        error: function (request, status, error) {
            sessionStorage.removeItem("authToken");
            $(window.location).attr('href', 'index.html');
        }
    });


}



