/* global j */

$(document).ready(function () {
    $("#popupAula").hide();
    $("#popupLogin").hide();
    $("#attrezzatureAula").hide();
    $("#gruppiAula").hide();
});

function showAulaInformationsByName() {
    $("#popupAula").empty();
    let form = document.getElementById("search_aula");
    let search = form.elements["aula"].value;
    let sanitizedSearch = search.replace(/[<>"'=()*!?]/g, '');
    if (sanitizedSearch) {
        $.ajax({
            url: "rest/aule/" + sanitizedSearch,
            method: "GET",
            success: function (response) {
                if (Object.keys(response).length > 0) {
                    let id = response["id_aula"];
                    showAulaInformationsById(id);
                } else {
                    let popupContent =
                            '<div>' +
                            '<div class="exit">' +
                            '<button type="button" onclick="fadeOutPopupAula()">X</button>' +
                            '</div>' +
                            '<h2  style="clear: right">NESSUN RISULTATO</h2>' +
                            '<p class="search null">ci dispiace, ma la ricerca <b><em>' + sanitizedSearch + '</b></em> non ha fornito risultati</p>' +
                            '</div>';
                    $("#popupAula").append(popupContent);
                    $("#popupAula").fadeIn(1000);
                    let form = document.getElementById("search_aula");
                    let search = form.elements["aula"].value = "";
                }
            },
            error: function (xhr, status, error) {
                $("auleweb").append(xhr.responseText);
                $("auleweb").show();
            }
        });
    }
}

function showAulaInformationsById(id) {
    $.ajax({
        url: "rest/aule/" + id,
        method: "GET",
        success: function (response) {
            $("#popupAula").empty();
            let popupContent =
                    '<div class="exit">' +
                    '<button type="button" onclick="fadeOutPopupAula()">X</button>' +
                    '</div>' +
                    '<div class="container">' +
                    '<div class="ten columns">' +
                    '<h2>INFORMAZIONI</h2>';
            if (sessionStorage.getItem("authToken") !== null) {
                popupContent +=
                        '<button type="button" value="' + response["id_aula"] + '" onclick="formAssign(this.value)">assegna gruppi</button>' +
                        '<button type="button" value="' + response["id_aula"] + '" onclick="exportAulaCSV(this.value)">download</button>';


            } else {
                popupContent += '<button type="button" value="' + response["id_aula"] + '" onclick="showEventiFormByAulaId(this.value)">eventi</button>';
            }

            popupContent +=
                    "<p><b>NOME</b>: " + response["nome"].toLowerCase() + "</p>" +
                    "<p><b>LUOGO</b>: " + response["luogo"].toLowerCase() + "</p>" +
                    "<p><b>EDIFICIO</b>: " + response["edificio"].toLowerCase() + "</p>" +
                    "<p><b>CAPIENZA</b>: " + response["capienza"] + "</p>" +
                    "<p><b>RESPONSABILE</b>: " + response["responsabile"].toLowerCase() + "</p>" +
                    "<p><b>PRESE ELETTRICHE</b>: " + response["prese_elettriche"] + "</p>" +
                    "<p><b>PRESE DI RETE</b>: " + response["prese_di_rete"] + "</p>" +
                    '<p class="attrezzature" id="showAule" onclick="showAttrezzatureByAula(' + response["id_aula"] + ')">mostra le attrezzature</p>' +
                    '<div id="attrezzatureAula"></div>' +
                    '<p class="attrezzature" id="showGruppi" onclick="showGruppiByAula(' + response["id_aula"] + ')">mostra i gruppi di appartenenza</p>' +
                    '<div id="gruppiAula"></div>' +
                    '</div>' +
                    '</div>';



            $("#popupAula").append(popupContent);
            $("#popupAula").fadeIn(1000);
        }
    });
}

function showGruppiByAula(id) {
    $("#gruppiAula").empty();
    $("#showGruppi").hide();
    $.ajax({
        url: "rest/aule/" + id + "/gruppi",
        method: "get",
        success: function (response) {
            let gruppiContent = "";
            if (Object.keys(response).length > 0) {
                Object.keys(response).forEach(function (key) {
                    let gruppo = response[key];
                    gruppiContent += "<p><b>" + gruppo["tipo"] + "</b>: " + gruppo["nome"] + "</p>";
                });
                gruppiContent += '</p><p class="attrezzature" id="hide" onclick="hideGruppi()">nascondi gruppi</p>';
                $("#gruppiAula").append(gruppiContent);
                $("#gruppiAula").show();
            } else {
                let message = "<p>non ci sono gruppi associati a questa aula</p>";
                message += '<p class="attrezzature" onclick="hideGruppi()">nascondi</p>';
                $("#gruppiAula").append(message);
                $("#gruppiAula").show();

            }
        }
    });
}

function showAttrezzatureByAula(id) {
    $("#attrezzatureAula").empty();
    $("#showAule").hide();
    $.ajax({
        url: "rest/aule/" + id + "/attrezzature",
        method: "GET",
        success: function (response) {
            let attrezzatureContent = "";
            if (Object.keys(response).length > 0) {
                attrezzatureContent += "<p>";
                Object.keys(response).forEach(function (key) {
                    //alert(key);
                    attrezzatureContent += key + " x" + response[key] + "<br>";
                });
                attrezzatureContent += '</p><p class="attrezzature" id="hide" onclick="hideAttrezzature()">nascondi attrezzature</p>';
                $("#attrezzatureAula").append(attrezzatureContent);
                $("#attrezzatureAula").show();
            } else {
                let message = "<p>non ci sono attrezzature disponibili in questa aula</p>";
                message += '<p class="attrezzature" onclick="hideAttrezzature()">nascondi</p>';
                $("#attrezzatureAula").append(message);
                $("#attrezzatureAula").show();
            }
        }

    });
}

function fillAuleTable(id) {
    $.ajax({
        url: "rest/aule",
        method: "get",
        success: function (response) {
            let table = "";
            table += '<table><th></th><th>NOME</th>';
            if (id) {
                let aula = response[id];
                table +=
                        '<tr>' +
                        '<td><input type="radio" name="aula" value="' + id + '" onchange="validateEventsInputs()" checked/></td>' +
                        '<td>' + aula['nome'] + '</td>' +
                        '</tr>';
                delete response[id];
            }

            Object.keys(response).forEach(function (key) {
                let aula = response[key];
                table +=
                        '<tr>' +
                        '<td><input type="radio" name="aula" value="' + key + '" onchange="validateEventsInputs()"/></td>' +
                        '<td>' + aula['nome'] + '</td>' +
                        '</tr>';
            });
            table += '</table>';
            $("#aula").empty().append(table);
        },
        error: function (xhr) {
            $("#aula").empty().append(xhr.responseText);
        }
    });
}

function exportAulaCSV(id) {
    $.ajax({
        url: "rest/aule/" + id + "/export",
        method: "get",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("authToken")
        },
        xhrFields: {
            responseType: "blob"
        },
        success: function (response) {
            //specifichiamo un url temporaneo che ci servirà per accedere ai dati binari
            let url = window.URL.createObjectURL(new Blob([response]));
            let a = document.createElement('a');
            a.href = url;
            a.download = "aula_export.csv";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        },
        error: function (xhr, status, error) {
            $("#container").empty().append(xhr.responseText);
        }
    });

}



function insertNewAula() {
    let idAttrezzatureArray = [];
    let nome = document.getElementById("nome").value.toUpperCase();
    let luogo = ("via " + document.getElementById("via").value + "," + document.getElementById("civico").value).toUpperCase();
    let edificio = document.getElementById("edificio").value.toUpperCase();
    let piano = document.getElementById("piano").value;
    let capienza = document.getElementById("capienza").value;
    let prese_elettriche = document.getElementById("prese_elettriche").value;
    let prese_rete = document.getElementById("prese_rete").value;
    let note_generiche = document.getElementById("note_generiche").value.toUpperCase();
    let responsabileKey = document.querySelector('input[type="radio"][name="responsabile"]:checked').value;
    let idAttrezzature = document.querySelectorAll('input[type="checkbox"][name="attrezzatura"]:checked');

    for (let i = 0; i < idAttrezzature.length; i++) {
        let id = idAttrezzature[i].value;
        idAttrezzatureArray.push(id);
    }

    let aula = {
        nome: nome,
        luogo: luogo,
        edificio: edificio,
        piano: piano,
        capienza: capienza,
        prese_elettriche: prese_elettriche,
        prese_rete: prese_rete,
        note_generiche: note_generiche,
        id_responsabile: responsabileKey,
        attrezzature: idAttrezzatureArray
    };

    $.ajax({
        url: "rest/aule",
        method: "post",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("authToken")
        },
        contentType: "application/json",
        data: JSON.stringify(aula),
        success: function (data, textStatus, jqXHR) {
            //jqXHR rappresenta l'oggetto jqXHR (XMLHttpRequest) che contiene le informazioni sulla richiesta AJAX
            //come lo stato, gli header, i metodi ausiliari. Può essere utilizzato per accedere a informazioni aggiuntive sulla richiesta
            //Prendiamo la URI che ci indirizza all'oggetto appena creato
            if (jqXHR.status === 201) {
                let uri = jqXHR.getResponseHeader('Location');
                $.ajax({
                    url: uri,
                    method: 'get',
                    success: function (response) {
                        sessionStorage.setItem("ID_aula", response["id_aula"]);
                        let id_aula = sessionStorage.getItem("ID_aula");
                        showPopupAssign(id_aula);
                    }
                });
            }
        },
        error: function (xhr) {
            window.scrollTo(0,0);
            document.querySelectorAll('input').forEach(input => input.value='');
            document.querySelector('textarea').value='';
            document.querySelectorAll('input[type="radio"]:checked').forEach(input => input.checked = false);
            document.querySelectorAll('input[type="checkbox"]:checked').forEach(input => input.checked = false);
            let content =
                    '<div class="exit">' +
                    '<button type="button" onclick="fadeOutPopupError()">X</button>' +
                    '</div>' +
                    '<div class="container">' +
                    '<div class="ten columns">' +
                    '<h2>ERRORE</h2>' +
                    '<p>' + xhr.responseText + '</p>' +
                    '</div>' + 
                    '</div>';
            $("#popupError").empty().append(content).fadeIn(1000);
        }
    });


}

function importAula() {
    let input = document.getElementById("aula_import");
    let file = input.files[0];
    let formData = new FormData();
    formData.append("file", file);
    $.ajax({
        url: "rest/aule/import",
        method: "post",
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
            document.getElementById("nome").value = response["nome"];
            document.getElementById("via").value = response["via"];
            document.getElementById("civico").value = response["civico"];
            document.getElementById("edificio").value = response["edificio"];
            document.getElementById("piano").value = response["piano"];
            document.getElementById("capienza").value = response["capienza"];
            document.getElementById("prese_elettriche").value = response["prese_elettriche"];
            document.getElementById("prese_rete").value = response["prese_di_rete"];
            document.getElementById("note_generiche").value = response["note"];

            $.ajax({
                url: "rest/responsabili/" + response["responsabile"],
                method: "get",
                success: function (response) {
                    fillResponsabiliTable(response["ID"]);
                }
            });

            let array = [];
            array = response["attrezzature"].split(",");
            let attrezzature = {
                nomi: array
            };

            $.ajax({
                url: "rest/attrezzature",
                method: "post",
                contentType: "application/json",
                data: JSON.stringify(attrezzature),
                success: function (response) {
                    fillAttrezzatureTable(response);
                }
            });
            document.getElementById("button_aula").disabled = false;
            $("#popupImportAula").fadeOut(1000);
        },
        error: function (xhr) {
            let errorContent = "<h2>ERRORE</h2><p>errore nel caricamento della configurazione dell\'aula</p>";
            $("#popupImportAula").empty().append(errorContent);
        }

    });
}



