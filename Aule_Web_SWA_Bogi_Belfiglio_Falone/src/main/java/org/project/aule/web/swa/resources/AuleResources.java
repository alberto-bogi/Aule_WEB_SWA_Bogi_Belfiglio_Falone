/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.project.aule.web.swa.resources;

import jakarta.ws.rs.Consumes;

import jakarta.servlet.ServletContext;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.WebApplicationException;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.StreamingOutput;
import jakarta.ws.rs.core.UriInfo;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URI;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Time;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.glassfish.jersey.server.Uri;
import org.glassfish.jersey.media.multipart.FormDataBodyPart;
import org.glassfish.jersey.media.multipart.FormDataParam;
import org.project.aule.web.swa.exception.RESTWebApplicationException;
import org.project.aule.web.swa.model.Attrezzatura;
import org.project.aule.web.swa.model.Aula;
import org.project.aule.web.swa.model.Gruppo;
import org.project.aule.web.swa.resources.csv.CSVResult;
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
    public Response getAule() {
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
            PreparedStatement attrezzatureByAulaId = DBConnection.getConnection().prepareStatement("SELECT nome, count(nome) AS numero FROM Attrezzatura WHERE ID_aula = ? GROUP BY nome");
            //PrepareStatement attrezzatureByAulaId = DBConnection.getConnection().prepareStatement(sql)
            Map<String, Object> response = new HashMap<>();
            attrezzatureByAulaId.setInt(1, aulaKey);
            try ( ResultSet rs = attrezzatureByAulaId.executeQuery()) {
                while (rs.next()) {
                    //Attrezzatura attrezzatura = Attrezzatura.createAttrezzatura(rs);
                    response.put(rs.getString("nome"), rs.getInt("numero"));
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
    ) {
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

    @Logged
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addAula(
            @Context ContainerRequestContext req,
            @Context UriInfo uriinfo,
            Map<String, Object> eventoJson
    ) {
        try {
            if (req.getProperty("token") == null) {
                throw new RESTWebApplicationException();
            }
            URI uri;
            PreparedStatement insertAula = DBConnection.getConnection().prepareStatement("INSERT INTO aula (nome,luogo,edificio,piano,capienza,numero_prese_elettriche,numero_prese_di_rete,note_generiche,ID_responsabile) VALUES(?,?,?,?,?,?,?,?,?)", Statement.RETURN_GENERATED_KEYS);
            PreparedStatement updateAttrezzatura = DBConnection.getConnection().prepareStatement("UPDATE attrezzatura SET ID_aula=? WHERE ID=?");
            insertAula.setString(1, eventoJson.get("nome").toString());
            insertAula.setString(2, eventoJson.get("luogo").toString());
            insertAula.setString(3, eventoJson.get("edificio").toString());
            insertAula.setInt(4, Integer.parseInt(eventoJson.get("piano").toString()));
            insertAula.setInt(5, Integer.parseInt(eventoJson.get("capienza").toString()));
            insertAula.setInt(6, Integer.parseInt(eventoJson.get("prese_elettriche").toString()));
            insertAula.setInt(7, Integer.parseInt(eventoJson.get("prese_rete").toString()));
            insertAula.setString(8, eventoJson.get("note_generiche").toString());
            insertAula.setInt(9, Integer.parseInt(eventoJson.get("id_responsabile").toString()));
            List<String> attrezzature = new ArrayList<>();
            attrezzature = (List<String>) eventoJson.get("attrezzature");

            if (insertAula.executeUpdate() == 1) {
                try ( ResultSet keys = insertAula.getGeneratedKeys()) {
                    if (keys.next()) {
                        int key = keys.getInt(1);
                        for (String attrezzatura : attrezzature) {
                            updateAttrezzatura.setInt(1, key);
                            updateAttrezzatura.setInt(2, Integer.parseInt(attrezzatura));
                            updateAttrezzatura.executeUpdate();
                        }

                        uri = uriinfo.getBaseUriBuilder()
                                .path(getClass())
                                .path(getClass(), "getAula")
                                .build(key);
                        return Response.created(uri).build();
                    }

                }
            }

        } catch (SQLException | ClassNotFoundException ex) {
            throw new RESTWebApplicationException(ex.getMessage());
        }
        throw new RESTWebApplicationException();
    }

    @Path("{id_aula: [0-9]+}/export")
    @GET
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    public Response exportAulaCSV(
            @Context ContainerRequestContext req,
            @Context ServletContext sc,
            @PathParam("id_aula") int aulaKey
    ) {
        try {
            Aula aula = null;
            List<Gruppo> gruppi = new ArrayList<>();
            List<Attrezzatura> attrezzature = new ArrayList();
            PreparedStatement attrezzatureByAula = DBConnection.getConnection().prepareStatement("SELECT * FROM Attrezzatura WHERE ID_aula = ?");
            PreparedStatement gruppiByAula = DBConnection.getConnection().prepareStatement("SELECT G.* FROM Gruppo G, associazione_aula_gruppo AG WHERE AG.ID_aula = ? AND AG.ID_gruppo = G.ID");
            PreparedStatement aulaById = DBConnection.getConnection().prepareStatement("SELECT * FROM Aula WHERE ID = ?");

            attrezzatureByAula.setInt(1, aulaKey);
            gruppiByAula.setInt(1, aulaKey);
            aulaById.setInt(1, aulaKey);

            try ( ResultSet rs = aulaById.executeQuery()) {
                if (rs.next()) {
                    aula = Aula.createAula(rs);
                    try ( ResultSet rs2 = gruppiByAula.executeQuery()) {
                        while (rs2.next()) {
                            gruppi.add(Gruppo.createGruppo(rs2));
                        }
                    }
                    try ( ResultSet rs3 = attrezzatureByAula.executeQuery()) {
                        while (rs3.next()) {
                            attrezzature.add(Attrezzatura.createAttrezzatura(rs3));
                        }
                    }

                }

            }
            File response = CSVResult.createCSVAulaFile(aula, attrezzature, gruppi, sc.getRealPath("") + File.separatorChar + "aula.csv");

            return Response.ok(response).build();
        } catch (SQLException | ClassNotFoundException ex) {
            throw new RESTWebApplicationException(ex.getMessage());
        } catch (Exception ex) {
            throw new RESTWebApplicationException(ex.getMessage());
        }

    }

    @Path("{id_aula: [0-9]+}/gruppi")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response assignGruppo(
            @Context ContainerRequestContext req,
            @PathParam("id_aula") int aulaKey,
            Map<String, Object> eventoJson
    ) {
        String response = "";
        try {
            PreparedStatement sAssociation = DBConnection.getConnection().prepareStatement("SELECT AG.ID FROM associazione_aula_gruppo AG, Gruppo G WHERE AG.ID_aula = ? AND AG.ID_gruppo = G.ID AND G.tipo = ?");
            PreparedStatement iAssociation = DBConnection.getConnection().prepareStatement("INSERT INTO associazione_aula_gruppo(ID_aula, ID_gruppo) VALUES (?, ?)");
            PreparedStatement uAssociation = DBConnection.getConnection().prepareStatement("UPDATE associazione_aula_gruppo SET ID_gruppo = ? WHERE ID = ?");
            List<String> arrayGruppi = new ArrayList<>();
            arrayGruppi = (List<String>) eventoJson.get("array");
            for (String gruppoID : arrayGruppi) {
                Gruppo gruppo = Gruppo.createGruppoById(Integer.parseInt(gruppoID));
                sAssociation.setInt(1, aulaKey);
                sAssociation.setString(2, gruppo.getTipoGruppo());
                try ( ResultSet rs = sAssociation.executeQuery()) {
                    if (!rs.next()) {
                        iAssociation.setInt(1, aulaKey);
                        iAssociation.setInt(2, gruppo.getKey());
                        iAssociation.executeUpdate();
                        response = "Associazione Aula Gruppo avvenuta con successo!";
                    } else {
                        uAssociation.setInt(1, gruppo.getKey());
                        uAssociation.setInt(2, rs.getInt(1));
                        if (uAssociation.executeUpdate() == 1) {
                            response = "Modifica Aula Gruppo avvenuta con successo!";
                        }
                    }
                }
            }

        } catch (SQLException | ClassNotFoundException ex) {
            throw new RESTWebApplicationException(ex.getMessage());
        } catch (Exception ex) {
            throw new RESTWebApplicationException(ex.getMessage());
        }
        return Response.ok(response).build();
    }

    @Path("import")
    @POST
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public Response importAulaCSV(
            @FormDataParam("file") FormDataBodyPart part,
            @Context ServletContext sc
    ) {
        //convertiamo il contenuto della parte identificata con la chiave "file" in un oggetto di tipo File
        File file = part.getValueAs(File.class);
        Map<String, String> response = CSVResult.readCSVAulaFile(file);

        return Response.ok(response).build();

    }

}
