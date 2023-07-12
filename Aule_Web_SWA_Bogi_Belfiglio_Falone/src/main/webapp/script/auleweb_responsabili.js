
function fillResponsabiliTable(id){
    $.ajax({
            url:"rest/responsabili",
            method:"get",
            success: function(response){
                let table = "";
                table += '<table><th></th><th>EMAIL</th>';
                if(id){
                   table +=
                            '<tr>' + 
                            '<td><input type="radio" name="responsabile" value="' + id + '" onchange="validateEventsInputs()" checked/></td>' +
                            '<td>' + response[id] + '</td>' +
                            '</tr>'; 
                    delete response[id];
                }
                Object.keys(response).forEach(function(key){
                    table +=
                            '<tr>' + 
                            '<td><input type="radio" name="responsabile" value="' + key + '" onchange="validateEventsInputs()"/></td>' +
                            '<td>' + response[key] + '</td>' +
                            '</tr>';
                });
                table += '</table>';
                $("#responsabile").empty().append(table);
            },
            error: function(xhr){
                $("#responsabile").empty().append(xhr.responseText);
            }
        });
}

