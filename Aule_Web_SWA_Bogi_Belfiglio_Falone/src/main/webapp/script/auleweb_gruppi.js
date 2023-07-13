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
