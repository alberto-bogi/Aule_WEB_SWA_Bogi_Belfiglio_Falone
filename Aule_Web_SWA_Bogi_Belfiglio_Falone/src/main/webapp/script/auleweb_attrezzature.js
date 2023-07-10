function fillAttrezzatureTable() {
    $.ajax({
        url: "rest/attrezzature",
        method: "get",
        success: function (response) {
            let table = "";
            table += '<table><th></th><th>NOME</th><th>NUMERO DI SERIE</th>';
            Object.keys(response).forEach(function (key) {
                let attrezzatura = response[key];
                table +=
                        '<tr>' +
                        '<td><input type="checkbox" class="attrezzatura" value="' + attrezzatura["ID"] + '" onchange="validateEventInputs()/></td>' +
                        '<td>' + attrezzatura['nome'] + '</td>' +
                        '<td>' + attrezzatura['numero_serie'] + '</td>' +
                        '</tr>';
            });
            $("#attrezzatura").empty().append(table);
        },
        error: function (xhr) {
            $("#attrezzatura").empty().append(xhr.responseText);
        }
    });
}

