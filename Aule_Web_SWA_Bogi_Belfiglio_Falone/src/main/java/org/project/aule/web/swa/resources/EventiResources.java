/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.project.aule.web.swa.resources;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriInfo;
import java.net.URI;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import org.project.aule.web.swa.exception.RESTWebApplicationException;
import org.project.aule.web.swa.model.Aula;
import org.project.aule.web.swa.model.Corso;
import org.project.aule.web.swa.model.Evento;
import org.project.aule.web.swa.model.Responsabile;
import org.project.aule.web.swa.resources.database.DBConnection;

/**
 *
 * @author acer
 */
@Path("eventi")
public class EventiResources {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCurrentEventi() {
        Map<Integer, Map<String, Object>> response = new HashMap();
        try {
            PreparedStatement currentEventi = DBConnection.getConnection().prepareStatement("SELECT * FROM Evento WHERE data_evento = CURDATE() AND ((ora_inizio BETWEEN (CURTIME() - INTERVAL 15 MINUTE) AND (CURTIME() + INTERVAL 3 HOUR)) "
                    + "OR(CURTIME() BETWEEN ora_inizio AND ora_fine))ORDER BY data_evento, ora_inizio;");

            try ( ResultSet rs = currentEventi.executeQuery()) {
                while (rs.next()) {
                    Evento evento = Evento.createEvento(rs);
                    Map<String, Object> item = new HashMap();
                    item.put("nome", evento.getNome());
                    item.put("aula", evento.getAula().getNome());
                    item.put("id_aula", evento.getAulaKey());
                    item.put("ora_inizio", evento.getOraInizio().toString());
                    item.put("ora_fine", evento.getOraFine().toString());

                    response.put(rs.getInt("ID"), item);
                }
            }
        } catch (SQLException | ClassNotFoundException ex) {
            throw new RESTWebApplicationException(ex.getMessage());
        } catch (Exception ex) {
            throw new RESTWebApplicationException(ex.getMessage());
        }
        return Response.ok(response).build();
    }

    @Path("{id_evento: [0-9]+}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getEvento(
            @PathParam("id_evento") int eventoKey
    ) {
        try {
            Evento evento = new Evento();
            Map<String, Object> response = new HashMap<>();
            PreparedStatement eventoById = DBConnection.getConnection().prepareStatement("SELECT * FROM Evento WHERE ID = ?");

            //ricaviamo l'evento dal suo ID
            eventoById.setInt(1, eventoKey);
            try ( ResultSet rs = eventoById.executeQuery()) {
                if (rs.next()) {
                    evento = Evento.createEvento(rs);

                    response.put("nome", evento.getNome());
                    response.put("data", evento.getDataEvento().toString());
                    response.put("ora_inizio", evento.getOraInizio().toString());
                    response.put("ora_fine", evento.getOraFine().toString());
                    response.put("aula", evento.getAula().getNome());
                    response.put("responsabile", evento.getResponsabile().getEmail());
                    response.put("tipo", evento.getTipologia().toString());
                    if (evento.getCorsoKey() > 0) {
                        response.put("corso", evento.getCorso().getNome());
                    } else {
                        response.put("corso", "non specificato");
                    }
                    response.put("ricorrenza", evento.getRicorrenza().toString());
                    if (!"NESSUNA".equals(evento.getRicorrenza().toString())) {
                        response.put("data_ricorrenza", evento.getDataFineRicorrenza().toString());
                    } else {
                        response.put("data_ricorrenza", "non definita");
                    }
                }
            }
            return Response.ok(response).build();
        } catch (Exception ex) {
            throw new RESTWebApplicationException(ex.getMessage());
        }
    }


    @Path("{name_evento: [a-zA-Z]+[A-Za-z0-9(%20)]*}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getEventoByName(
            @PathParam("name_evento") String nome
    ) {
        try {
            Evento evento = new Evento();
            Map<String, Object> response = new HashMap<>();
            PreparedStatement eventoByName = DBConnection.getConnection().prepareStatement("SELECT * FROM Evento WHERE nome = ?");

            //ricaviamo l'evento dal suo nome
            eventoByName.setString(1, nome.toUpperCase());
            try ( ResultSet rs = eventoByName.executeQuery()) {
                if (rs.next()) {
                    evento = Evento.createEvento(rs);
                    response.put("nome", evento.getNome());
                    response.put("data", evento.getDataEvento().toString());
                    response.put("ora_inizio", evento.getOraInizio().toString());
                    response.put("ora_fine", evento.getOraFine().toString());
                    response.put("aula", evento.getAula().getNome());
                    response.put("responsabile", evento.getResponsabile().getEmail());
                    response.put("tipo", evento.getTipologia().toString());
                    if (evento.getCorsoKey() > 0) {
                        response.put("corso", evento.getCorso().getNome());
                    } else {
                        response.put("corso", "non specificato");
                    }
                    response.put("ricorrenza", evento.getRicorrenza().toString());
                    if (!"NESSUNA".equals(evento.getRicorrenza().toString())) {
                        response.put("data_ricorrenza", evento.getDataFineRicorrenza().toString());
                    } else {
                        response.put("data_ricorrenza", "non definita");
                    }
                }
            }
            return Response.ok(response).build();
        } catch (Exception ex) {
            throw new RESTWebApplicationException(ex.getMessage());
        }
    }

}

