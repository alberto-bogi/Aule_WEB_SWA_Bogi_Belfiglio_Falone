
function fillResponsabiliTable(){
    $.ajax({
            url:"rest/responsabili",
            method:"get",
            success: function(response){
                let table = "";
                table += '<table><th></th><th>EMAIL</th>';
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

