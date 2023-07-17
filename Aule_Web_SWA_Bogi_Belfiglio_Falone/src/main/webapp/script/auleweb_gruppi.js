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
    let nome_aula = "";
    $.ajax({
        url: "rest/aule/" + id_aula,
        method: "get",
        success: function(response){
            nome_aula = response["nome"];    
        }
    });
    $("#popupAula").hide();
    $("#popupAssegnaGruppo").hide();
    $.ajax({
        url: "rest/gruppi",
        method: "GET",
        success: function (response) {
            $("#container").empty();
            let popupContent = "";
            popupContent +=
                    '<div class="form gruppo">' +
                    '<div class="container">' +
                    '<div class="ten columns">' +
                    '<h3>ASSEGNAZIONE GRUPPI PER AULA ' + nome_aula + '</h3>' +
                    '<button type="button" onclick="location.reload()">annulla</button><br>' +
                    '<p>Seleziona il gruppo in base al suo tipo:</p>';
            Object.keys(response).forEach(function (key) {
                let gruppi = response[key];
                popupContent +=
                        '<label>' + key + ": " + '</label>' +
                        '<select name="select_name" onchange="select_button_abilitato()">' +
                        '<option disabled selected value="">Seleziona un gruppo di tipo ' + key.toLowerCase() + '</option>';
                Object.keys(gruppi).forEach(function (key) {
                    //alert(key);
                    popupContent +=
                            '<option value="' + key + '">' + gruppi[key] + '</option>';
                });

                popupContent +=
                    '</select>' +
                    '<br>';
            });
          popupContent +=
                    '<button type="button" id="button_assegna" value="' + id_aula + '" onclick="assignGruppoToAula(this.value)" disabled>Assegna</button>' +
                    '</div>';
            $("#container").empty().append(popupContent);
            $("#container").show();

        },
        error: function (xhr) {
            $("#container").empty().append(xhr.responseText);
        }
    });
}

function assignGruppoToAula(id) {
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
            //alert(response);
            location.reload();
        },
        error: function (xhr, status, error) {
            let content = "<p>" + xhr.responseText + "</p>";
            $("#container").empty().append(content).fadeIn(1000);
        }
    });

}




