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
                        '<td class="attrezzatura_check"><input type="checkbox" name="attrezzatura" value="' + key + '" onchange="validateAuleInputs()"/></td>' +
                        '<td>' + attrezzatura["nome"] + '</td>' +
                        '<td>' + attrezzatura["numeroDiSerie"] + '</td>';
                        '</tr>';
            });
            table += '</table>';
            $("#attrezzatura").empty().append(table);
        },
        error: function (xhr) {
            $("#attrezzatura").empty().append(xhr.responseText);
        }
    });
}

