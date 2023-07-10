/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.project.aule.web.swa.resources;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import org.project.aule.web.swa.exception.RESTWebApplicationException;
import org.project.aule.web.swa.model.Corso;
import org.project.aule.web.swa.resources.database.DBConnection;

/**
 *
 * @author acer
 */
@Path("corsi")
public class CorsiResources {
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCorsi()throws Exception{
        Map<Integer,Map<String, Object>> response = new HashMap<>();
        try{
            PreparedStatement allCorsi = DBConnection.getConnection().prepareStatement("SELECT * FROM Corso");
            try(ResultSet rs = allCorsi.executeQuery()){
                while(rs.next()){
                    Corso corso = Corso.createCorso(rs);
                    Map<String, Object> item = new HashMap();
                    item.put("nome", corso.getNome());
                    item.put("laurea", corso.getCorsoDiLaurea());
                    item.put("tipo", corso.getTipoLaurea().toString());
                    response.put(corso.getKey(), item);
                }
            }
            return Response.ok(response).build();
        }catch(SQLException | ClassNotFoundException ex){
            throw new RESTWebApplicationException(ex.getMessage());
        }
    }
    
}
