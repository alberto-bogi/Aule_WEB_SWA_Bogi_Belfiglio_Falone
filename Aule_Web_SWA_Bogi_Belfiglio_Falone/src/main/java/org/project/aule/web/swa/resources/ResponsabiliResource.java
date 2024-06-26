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
import org.project.aule.web.swa.model.Responsabile;
import org.project.aule.web.swa.resources.database.DBConnection;

/**
 *
 * @author acer
 */
@Path("responsabili")
public class ResponsabiliResource {
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getResponsabili()throws Exception{
        Map<Integer,Object> response = new HashMap<>();
        try{
            PreparedStatement allResponsabili = DBConnection.getConnection().prepareStatement("SELECT * FROM Responsabile");
            try(ResultSet rs = allResponsabili.executeQuery()){
                while(rs.next()){
                    Responsabile responsabile = Responsabile.createResponsabile(rs);
                    response.put(responsabile.getKey(), responsabile.getEmail());
                }
            }
            return Response.ok(response).build();
        }catch(SQLException | ClassNotFoundException ex){
            throw new RESTWebApplicationException(ex.getMessage());
        }
    }
    
    @Path("{email}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getResponsabileByEmail(
            @PathParam("email") String email
    ){
        try{
            Map<String, Object> response = new HashMap<>();
            PreparedStatement responsabileByEmail = DBConnection.getConnection().prepareStatement("SELECT ID FROM RESPONSABILE WHERE email = ?");
            responsabileByEmail.setString(1,email);
            try(ResultSet rs = responsabileByEmail.executeQuery()){
                if(rs.next()){
                    response.put("ID", rs.getInt("ID"));
                }
            }
            
            return Response.ok(response).build();
        }catch(SQLException | ClassNotFoundException ex){
            throw new RESTWebApplicationException(ex.getMessage());
        }
        
    }


@Path("{search:[A-Za-z0-9(%20)]*}/dynamic")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getResponsabiliByDynamicSearch(
            @PathParam("search") String search) {

        Map<Integer, String> response = new HashMap();
        try {
            PreparedStatement responsabiliByDynamicSearch = DBConnection.getConnection().prepareStatement("SELECT * FROM Responsabile WHERE substring(email,1,?) = ?");
            // da vedere
            responsabiliByDynamicSearch.setInt(1, search.length());
            responsabiliByDynamicSearch.setString(2, search);
            try ( ResultSet rs = responsabiliByDynamicSearch.executeQuery()) {
                while (rs.next()) {
                    Responsabile responsabile = Responsabile.createResponsabile(rs);
                    response.put(responsabile.getKey(), responsabile.getEmail());
                }
            }
        } catch (SQLException | ClassNotFoundException ex) {
            throw new RESTWebApplicationException(ex.getMessage());
        } catch (Exception ex) {
            throw new RESTWebApplicationException(ex.getMessage());
        }
        return Response.ok(response).build();
    }
}
