/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.project.aule.web.swa.resources;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriInfo;
import java.net.URI;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import org.project.aule.web.swa.exception.RESTWebApplicationException;
import org.project.aule.web.swa.model.Attrezzatura;
import org.project.aule.web.swa.model.Aula;
import org.project.aule.web.swa.model.Gruppo;
import org.project.aule.web.swa.resources.database.DBConnection;
import org.project.aule.web.swa.security.Logged;

/**
 *
 * @author acer
 */
@Path("aule")
public class AuleResources {
    

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAule(){
        Map<Integer, Map<String, Object>> response = new HashMap();
        try {
            PreparedStatement allAule = DBConnection.getConnection().prepareStatement("SELECT * FROM Aula");
            // da vedere
            try ( ResultSet rs = allAule.executeQuery()) {
                while (rs.next()) {
                    Aula aula = Aula.createAula(rs);
                    Map<String, Object> item = new HashMap();
                    item.put("nome", aula.getNome());
                    item.put("responsabile", aula.getResponsabile().getEmail());
                    item.put("luogo", aula.getLuogo());

                    response.put(aula.getKey(), item);
                }
            }
        } catch (SQLException | ClassNotFoundException ex) {
            throw new RESTWebApplicationException(ex.getMessage());
        } catch (Exception ex) {
            throw new RESTWebApplicationException(ex.getMessage());
        }
        return Response.ok(response).build();
    }

    @Path("{name:[a-zA-Z]+[a-zA-Z0-9\\.]*}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAulaId(
            @PathParam("name") String name,
            @Context UriInfo uriinfo
    ) {
        try {
            PreparedStatement aulaByName = DBConnection.getConnection().prepareStatement("SELECT ID FROM Aula WHERE nome = ?");
            Map<String, Object> response = new HashMap<>();
            aulaByName.setString(1, name);
            try ( ResultSet rs = aulaByName.executeQuery()) {
                if (rs.next()) {
                    response.put("id_aula", rs.getInt("ID"));
                }
            }
            return Response.ok(response).build();

        } catch (SQLException | ClassNotFoundException ex) {
            throw new RESTWebApplicationException(ex.getMessage());
        } catch (Exception ex) {
            throw new RESTWebApplicationException(ex.getMessage());
        }
    }
    
    
    @Path("{id_aula: [0-9]+}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAula(
            @PathParam("id_aula") int aulaKey
    ) {
        try {
            PreparedStatement aulaById = DBConnection.getConnection().prepareStatement("SELECT * FROM Aula WHERE ID = ?");
            //PrepareStatement attrezzatureByAulaId = DBConnection.getConnection().prepareStatement(sql)
            Map<String, Object> response = new HashMap<>();
            aulaById.setInt(1, aulaKey);
            try ( ResultSet rs = aulaById.executeQuery()) {
                if (rs.next()) {
                    Aula aula = Aula.createAula(rs);
                    response.put("id_aula", rs.getInt("ID"));
                    response.put("nome", aula.getNome());
                    response.put("luogo", aula.getLuogo());
                    response.put("edificio", aula.getEdificio());
                    response.put("capienza", aula.getCapienza());
                    response.put("responsabile", aula.getResponsabile().getEmail());
                    response.put("prese_elettriche", aula.getNumeroPreseElettriche());
                    response.put("prese_di_rete", aula.getNumeroPreseDiRete());
                }
            }
            return Response.ok(response).build();

        } catch (SQLException | ClassNotFoundException ex) {
            throw new RESTWebApplicationException(ex.getMessage());
        } catch (Exception ex) {
            throw new RESTWebApplicationException(ex.getMessage());
        }
    }
    
    @Path("{id_aula: [0-9]+}/attrezzature")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAttrezzatureByAulaId(
            @PathParam("id_aula") int aulaKey
    ) {
        try {
            PreparedStatement attrezzatureByAulaId = DBConnection.getConnection().prepareStatement("SELECT * FROM Attrezzatura WHERE ID_aula = ?");
            //PrepareStatement attrezzatureByAulaId = DBConnection.getConnection().prepareStatement(sql)
            Map<Integer, Map<String, Object>> response = new HashMap<>();
            attrezzatureByAulaId.setInt(1, aulaKey);
            try ( ResultSet rs = attrezzatureByAulaId.executeQuery()) {
                while (rs.next()) {
                    Attrezzatura attrezzatura = Attrezzatura.createAttrezzatura(rs);
                    Map<String, Object> item = new HashMap<>();
                    item.put("nome", attrezzatura.getNome());
                    
                    response.put(rs.getInt("ID"), item);
                }
            }
            return Response.ok(response).build();

        } catch (SQLException | ClassNotFoundException ex) {
            throw new RESTWebApplicationException(ex.getMessage());
        } catch (Exception ex) {
            throw new RESTWebApplicationException(ex.getMessage());
        }
    }
    
    @Path("{id_aula: [0-9]+}/gruppi")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getGruppiByAulaId(
            @PathParam("id_aula") int aulaKey
    ) {
        try {
            PreparedStatement gruppiByAulaId = DBConnection.getConnection().prepareStatement("SELECT G.* FROM Gruppo G, associazione_aula_gruppo AG WHERE G.ID = AG.ID_gruppo AND AG.ID_aula = ?");
            //PrepareStatement attrezzatureByAulaId = DBConnection.getConnection().prepareStatement(sql)
            Map<Integer, Map<String, Object>> response = new HashMap<>();
            gruppiByAulaId.setInt(1, aulaKey);
            try ( ResultSet rs = gruppiByAulaId.executeQuery()) {
                while (rs.next()) {
                    Gruppo gruppo = Gruppo.createGruppo(rs);
                    Map<String, Object> item = new HashMap<>();
                    item.put("nome", gruppo.getNome());
                    item.put("tipo", gruppo.getTipoGruppo());
                    response.put(rs.getInt("ID"), item);
                }
            }
            return Response.ok(response).build();

        } catch (SQLException | ClassNotFoundException ex) {
            throw new RESTWebApplicationException(ex.getMessage());
        } catch (Exception ex) {
            throw new RESTWebApplicationException(ex.getMessage());
        }
    }
    
    @Path("{search:[a-zA-Z]+[a-zA-Z0-9\\.]*}/dynamic")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAuleByDynamicSearch(
            @PathParam("search") String search
    ){
        Map<Integer, Map<String, Object>> response = new HashMap();
        try {////VEDERE QUIIIIIIIII
            PreparedStatement auleByDynamicSearch = DBConnection.getConnection().prepareStatement("SELECT * FROM Aula WHERE substring(nome,1,?) = ?");
            auleByDynamicSearch.setInt(1, search.length());
            auleByDynamicSearch.setString(2, search);
            try ( ResultSet rs = auleByDynamicSearch.executeQuery()) {
                while (rs.next()) {
                    Aula aula = Aula.createAula(rs);
                    Map<String, Object> item = new HashMap();
                    item.put("nome", aula.getNome());
                    item.put("responsabile", aula.getResponsabile().getEmail());
                    item.put("luogo", aula.getLuogo());

                    response.put(aula.getKey(), item);
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
