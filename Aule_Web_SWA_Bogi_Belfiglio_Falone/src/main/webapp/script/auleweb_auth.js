$(document).ready(function () {
    let count = 0;
    let timer = setInterval(function () {
        count++;
    }, 60000);
    if (sessionStorage.getItem("authToken")) {
        if (count === 30) {
            $.ajax({
                url: 'rest/auth/refresh',
                type: 'GET',
                success: function (response) {
                    let newToken = response; //mi salvo il nuovo token dalla response
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
        let form = document.forms["loginForm"];
        alert(form);
        let username = form.elements["username"].value;
        let password = form.elements["password"].value;
        alert(username);
        alert(password);
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
            sessionStorage.removeItem("authToken");
            alert("Logout effettuato con successo.");
            location.reload();
        },
        error: function (request, status, error) {
            handleError(request, status, error, "", "Errore in fase di logout.");
        }
    });


}



