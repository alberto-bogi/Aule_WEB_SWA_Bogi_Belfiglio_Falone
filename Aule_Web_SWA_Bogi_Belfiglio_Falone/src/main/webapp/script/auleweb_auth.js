$(document).ready(function () {

    if (sessionStorage.getItem("authToken")) {
        let count = parseInt(sessionStorage.getItem("count"));
        let refresh_time = parseInt(sessionStorage.getItem("refresh_time"));
        let timer = setInterval(function () {
            count++;
            sessionStorage.removeItem("count");
            sessionStorage.setItem("count", count);
            //alert(count);
            //alert("il refresh time è: "+refresh_time);
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
                        sessionStorage.setItem("refresh_time", refresh_time);
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
                let count = 0;
                let refresh_time = 30;
                sessionStorage.setItem("authToken", response);
                sessionStorage.setItem("count", count);
                sessionStorage.setItem("refresh_time", refresh_time);
                location.reload();
            },
            error: function () {
                $("#error_login").show();
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
                sessionStorage.removeItem("count");
                sessionStorage.removeItem("refresh_time");
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



