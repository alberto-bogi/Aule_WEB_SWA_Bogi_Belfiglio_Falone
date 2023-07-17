
function fillResponsabiliTable(id) {
    $.ajax({
        url: "rest/responsabili",
        method: "get",
        success: function (response) {
            let table = "";
            table += '<table><th></th><th>EMAIL</th>';
            if (document.getElementById("form_evento") !== null) {
                if (id) {
                    table +=
                            '<tr>' +
                            '<td><input type="radio" name="responsabile" value="' + id + '" onchange="validateEventsInputs()" checked/></td>' +
                            '<td>' + response[id] + '</td>' +
                            '</tr>';
                    delete response[id];
                }
                Object.keys(response).forEach(function (key) {
                    table +=
                            '<tr>' +
                            '<td><input type="radio" name="responsabile" value="' + key + '" onchange="validateEventsInputs()"/></td>' +
                            '<td>' + response[key] + '</td>' +
                            '</tr>';
                });
                table += '</table>';
            } else {
                if (id) {
                    table +=
                            '<tr>' +
                            '<td><input type="radio" name="responsabile" value="' + id + '" onchange="validateAuleInputs()" checked/></td>' +
                            '<td>' + response[id] + '</td>' +
                            '</tr>';
                    delete response[id];
                }
                Object.keys(response).forEach(function (key) {
                    table +=
                            '<tr>' +
                            '<td><input type="radio" name="responsabile" value="' + key + '" onchange="validateAuleInputs()"/></td>' +
                            '<td>' + response[key] + '</td>' +
                            '</tr>';
                });
                table += '</table>';
            }

            $("#responsabile").empty().append(table);
        },
        error: function (xhr) {
            $("#responsabile").empty().append(xhr.responseText);
        }
    });
}

function dynamicSearchResponsabile(input) {
    let search = input.value;
    if (!search) {
        fillResponsabiliTable();
    } else {
        $.ajax({
            url: "rest/responsabili/" + search + "/dynamic",
            method: "GET",
            success: function (response) {
                $("#responsabile").empty();
                let tableResponsabili = "<table><tr><th></th><th>EMAIL</th>";
                if (document.getElementById("form_evento") !== null) {
                Object.keys(response).forEach(function (key) {
                    tableResponsabili += "<tr>" +
                            '<td><input type="radio" name="responsabile" value="' + key + '" onchange="validateEventsInputs()"/></td>' +
                            "<td>" + response[key] + "</td>" +
                            "</tr>";
                });
            }else{
              Object.keys(response).forEach(function (key) {
                    tableResponsabili += "<tr>" +
                            '<td><input type="radio" name="responsabile" value="' + key + '" onchange="validateAuleInputs()"/></td>' +
                            "<td>" + response[key] + "</td>" +
                            "</tr>";
                });  
            }
                tableResponsabili += "</table>";
                $("#responsabile").append(tableResponsabili);
            },
            error: function (xhr) {
                $("#eventi_administration").append(xhr.responseText);
            }
        });
    }
}

