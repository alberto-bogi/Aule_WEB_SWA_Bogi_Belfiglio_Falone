/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.project.aule.web.swa.resources;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import org.project.aule.web.swa.exception.RESTWebApplicationException;
import org.project.aule.web.swa.model.Attrezzatura;
import org.project.aule.web.swa.resources.database.DBConnection;

/**
 *
 * @author stefa
 */
@Path("attrezzature")
public class AttrezzatureResources {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAttrezzature() throws Exception {
        Map<Integer, Map<String, Object>> response = new HashMap<>();
        try {
            PreparedStatement allAttrezzature = DBConnection.getConnection().prepareStatement("SELECT * FROM Attrezzatura");
            try ( ResultSet rs = allAttrezzature.executeQuery()) {
                while (rs.next()) {
                    Attrezzatura attrezzatura = Attrezzatura.createAttrezzatura(rs);
                    if (attrezzatura.getAulaKey() == 0) {
                        Map<String, Object> item = new HashMap<>();
                        item.put("nome", attrezzatura.getNome());
                        item.put("numeroDiSerie", attrezzatura.getNumeroDiSerie());
                        response.put(attrezzatura.getKey(), item);
                    }

                }
            }
            return Response.ok(response).build();

        } catch (SQLException | ClassNotFoundException ex) {
            throw new RESTWebApplicationException(ex.getMessage());
        }
    }

}
