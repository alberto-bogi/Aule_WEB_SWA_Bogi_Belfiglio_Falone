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
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriInfo;
import java.net.URI;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
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
public class EventiResources extends DBConnection {

    @GET
    @Produces("application/json")
    public Response getCurrentEventi(
            @Context UriInfo uriinfo
    ) {
        List<String> urlEventi = new ArrayList();
        try {
            PreparedStatement idCurrentEventi = this.getConnection().prepareStatement("SELECT * FROM Evento WHERE data_evento = CURDATE() AND ((ora_inizio BETWEEN (CURTIME() - INTERVAL 15 MINUTE) AND (CURTIME() + INTERVAL 3 HOUR)) "
                    + "OR(CURTIME() BETWEEN ora_inizio AND ora_fine))ORDER BY data_evento, ora_inizio;");
            List<Integer> idEventiCorrenti = new ArrayList();
            try ( ResultSet rs = idCurrentEventi.executeQuery()) {
                while (rs.next()) {
                    idEventiCorrenti.add(rs.getInt("ID"));
                }
                Iterator<Integer> keys = idEventiCorrenti.iterator();
                while (keys.hasNext()) {
                    Integer eventoKey = keys.next();
                    URI uri = uriinfo.getBaseUriBuilder()
                            .path(getClass())
                            .path(getClass(), "getEvento")
                            .build(eventoKey);
                    urlEventi.add(uri.toString());
                }

            }
        } catch (SQLException ex) {
            throw new RESTWebApplicationException(ex);
        }
        return Response.ok(urlEventi).build();
    }

    @Path("eventi/{id_evento: [0-9]+}")
    public EventoResource getEvento(
            @PathParam("id_evento") int eventoKey
    ) {
        try {
            Evento evento = null;
            Aula aula = null;
            Corso corso = null;
            Responsabile responsabile = null;
            PreparedStatement eventoById = this.getConnection().prepareStatement("SELECT * FROM Evento WHERE ID = ?");

            //ricaviamo l'evento dal suo ID
            eventoById.setInt(1, eventoKey);
            try ( ResultSet rs = eventoById.executeQuery()) {
                if (rs.next()) {
                    evento = Evento.createEvento(rs);
                }

            }
            return new EventoResource(evento);
        } catch (Exception ex) {
            throw new RESTWebApplicationException(ex);
        }
    }
}
