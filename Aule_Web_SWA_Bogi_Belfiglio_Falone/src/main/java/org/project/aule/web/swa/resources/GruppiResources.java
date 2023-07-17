/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.project.aule.web.swa.resources;

import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
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
import org.project.aule.web.swa.model.Gruppo;
import org.project.aule.web.swa.model.Responsabile;
import org.project.aule.web.swa.resources.database.DBConnection;
import org.project.aule.web.swa.security.Logged;

/**
 *
 * @author stefa
 */
@Path("gruppi")
public class GruppiResources {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getGruppi() throws Exception {
        Map<String, Map<Integer, String>> response = new HashMap<>();
        try {
            PreparedStatement allTipi = DBConnection.getConnection().prepareStatement("SELECT tipo FROM Gruppo GROUP BY tipo");
            PreparedStatement allGruppi = DBConnection.getConnection().prepareStatement("SELECT * FROM Gruppo WHERE tipo = ?");
            try ( ResultSet rs = allTipi.executeQuery()) {
                while (rs.next()) {
                    allGruppi.setString(1, rs.getString("tipo"));
                    try ( ResultSet rs2 = allGruppi.executeQuery()) {
                        Map<Integer, String> item = new HashMap<>();
                        while (rs2.next()) {
                            Gruppo gruppo = Gruppo.createGruppo(rs2);
                            
                            item.put(gruppo.getKey(), gruppo.getNome());
                            //item.put("tipo", gruppo.getTipoGruppo());
                            //item.put("nome", gruppo.getNome());
                            //item.put("descrizione", gruppo.getDescrizione());
                            
                        }
                        response.put(rs.getString("tipo"), item);
                    }
                }
                return Response.ok(response).build();
            }
        } catch (SQLException | ClassNotFoundException ex) {
            throw new RESTWebApplicationException(ex.getMessage());
        }
    }

}
