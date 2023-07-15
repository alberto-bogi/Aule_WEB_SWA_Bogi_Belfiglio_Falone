function fillGruppiTable() {
    $.ajax({
        url: "rest/gruppi",
        method: "get",
        success: function (response) {
            let table = "";
            table += '<table><th></th><th>NOME</th>';
            Object.keys(response).forEach(function (key) {
                table +=
                        '<tr>' +
                        '<td class="gruppi_radio"><input type="radio" name="gruppo" value="' + key + '"/></td>' +
                        '<td>' + response[key] + '</td>' +
                        '</tr>';
            });
            table += '</table>';
            $("#gruppo").empty().append(table);
        },
        error: function (xhr) {
            $("#gruppo").empty().append(xhr.responseText);
        }
    });
}

function showPopupAssign(id) {
    $("#popupAssegnaGruppo").empty();
    let id_aula = id;
    let popupContent = "";
    popupContent +=
            '<div class="container">' +
            '<div class="ten columns">' +
            '<h2>VUOI ASSEGNARE L\'AULA APPENA CREATA AD UN GRUPPO? </h2>' +
            '<p>ATTENZIONE: puoi sempre decidere di assegnare questa aula ad un\'gruppo successivamente</p>' +
            '<button type="button" id="button_si" value="id_aula" onclick="formAssign(' + id_aula + ')" >SI</button>' +
            '<button type="button" id="button_no" value="id_aula" onclick="location.reload()" >NO</button>';
    $("#popupAssegnaGruppo").empty().append(popupContent);
    $("#popupAssegnaGruppo").fadeIn(1000);
}


function formAssign(id) {
    let id_aula = id;
    $("#popupAula").hide();
    $("#popupAssegnaGruppo").hide();
    $.ajax({
        url: "rest/gruppi",
        method: "GET",
        success: function (response) {
            $("#container").empty();
            let tipiScritti = [];
            let popupContent = "";
            popupContent +=
                    '<div class="form gruppo">' +
                    '<div class="container">' +
                    '<div class="ten columns">' +
                    '<button type="button" onclick="location.reload()">annulla</button><br>' +
                    '<p>Seleziona il gruppo in base al suo tipo:</p>';
            Object.keys(response).forEach(function (key) {
                let gruppo = response[key];
                let salta = false;

                for (let i = 0; i < tipiScritti.length; i++) {
                    if (gruppo["tipo"] === tipiScritti[i]) {
                        salta = true;
                    }
                }
                if (salta === false) {
                    tipiScritti.push(gruppo["tipo"]);
                    popupContent +=
                            '<label for="' + gruppo["tipo"] + '">' + gruppo["tipo"] + ": " + '</label>' +
                            '<select name="select_name" onchange="select_button_abilitato()">' +
                            '<option disabled selected value="">Seleziona un gruppo di tipo ' + gruppo["tipo"].toString().toLowerCase() + '</option>';
                    Object.keys(response).forEach(function (key) {
                        let gruppoCiclato = response[key];
                        if (gruppoCiclato["tipo"] === gruppo["tipo"]) {
                            popupContent +=
                                    '<option value="' + gruppoCiclato["ID"] + '">' + gruppoCiclato["nome"] + '</option>';
                        }
                    });
                    popupContent +=
                            '</select>' +
                            '<br>';
                }

            });
            popupContent +=
                    '<button type="button" id="button_assegna" value="' + id_aula + '" onclick="AssignGruppoToAula(this.value)" disabled>Assegna</button>' +
                    '</div>';
            $("#container").empty().append(popupContent);
            $("#container").show();

        },
        error: function (xhr) {
            $("#container").empty().append(xhr.responseText);
        }
    });
}

function AssignGruppoToAula(id) {
    let id_aula = id;
    let selectElements = document.getElementsByName("select_name");
    let arrayGruppiIds = [];
    selectElements.forEach(function (select) {
        let selectedOption = select.value;
        if (selectedOption !== "") {
            arrayGruppiIds.push(selectedOption);
        }
    });

    let array = {
        array: arrayGruppiIds
    };

    $.ajax({
        url: "rest/aule/" + id_aula + "/gruppi",
        method: "post",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("authToken")
        },
        contentType: "application/json",
        data: JSON.stringify(array),
        success: function (response) {
            alert(response);
            location.reload();
        },
        error: function (xhr, status, error) {
            $("#container").empty().append(xhr.responseText);
        }
    });

}




