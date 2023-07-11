function fillCorsiTable() {
    $.ajax({
        url: "rest/corsi",
        method: "get",
        success: function (response) {
            let table = "";
            table +=
                    '<h4>CORSO</h4>' +
                    '<table><th></th><th>NOME</th><th>LAUREA</th><th>TIPO</th>';
            Object.keys(response).forEach(function (key) {
                let corso = response[key];
                table +=
                        '<tr>' +
                        '<td><input type="radio" name="corso" value="' + key + '" onchange="validateEventsInputs()"/></td>' +
                        '<td>' + corso["nome"] + '</td>' +
                        '<td>' + corso["laurea"] + '</td>' +
                        '<td>' + corso["tipo"] + "</td>";
                '</tr>';
            });
            table += '</table>';
            $("#corso").empty().append(table);
        },
        error: function (xhr) {
            $("#corso").empty().append(xhr.responseText);
        }
    });
}


