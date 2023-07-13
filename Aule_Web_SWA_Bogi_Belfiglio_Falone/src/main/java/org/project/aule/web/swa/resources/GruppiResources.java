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
import org.project.aule.web.swa.model.Gruppo;
import org.project.aule.web.swa.model.Responsabile;
import org.project.aule.web.swa.resources.database.DBConnection;

/**
 *
 * @author stefa
 */
@Path("gruppi")
public class GruppiResources {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getGruppi() throws Exception {
        Map<Integer, Object> response = new HashMap<>();
        try {
            PreparedStatement allGruppi = DBConnection.getConnection().prepareStatement("SELECT * FROM Gruppo");
            try ( ResultSet rs = allGruppi.executeQuery()) {
                while (rs.next()) {
                    Gruppo gruppo = Gruppo.createGruppo(rs);
                    response.put(gruppo.getKey(), gruppo.getNome());
                }
            }
            return Response.ok(response).build();
        } catch (SQLException | ClassNotFoundException ex) {
            throw new RESTWebApplicationException(ex.getMessage());
        }
    }
}
