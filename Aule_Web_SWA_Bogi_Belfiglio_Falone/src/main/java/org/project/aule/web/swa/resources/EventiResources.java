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
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import org.project.aule.web.swa.exception.RESTWebApplicationException;
import org.project.aule.web.swa.model.Aula;
import org.project.aule.web.swa.model.Corso;
import org.project.aule.web.swa.model.Evento;
import org.project.aule.web.swa.model.EventoRicorrente;
import org.project.aule.web.swa.model.Responsabile;
import org.project.aule.web.swa.resources.comparator.EventoComparator;
import org.project.aule.web.swa.resources.database.DBConnection;
import org.project.aule.web.swa.security.AuthHelpers;
import org.project.aule.web.swa.security.Logged;

/**
 *
 * @author acer
 */
@Path("eventi")
public class EventiResources {


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getEventi() {
        Map<Integer, Map<String, Object>> response = new HashMap();
        try {
            PreparedStatement allEventi = DBConnection.getConnection().prepareStatement("SELECT E.* FROM Evento E, Evento_ricorrente EV WHERE"
                    + "(E.data_evento > CURDATE() OR (E.data_evento = CURDATE() AND E.ora_inizio >= CURTIME())) OR (E.ID=EV.ID_evento AND ((EV.data_evento > CURDATE()) OR (EV.data_evento = CURDATE() AND E.ora_inizio >= CURTIME()))) GROUP BY E.ID");
            // da vedere
            try ( ResultSet rs = allEventi.executeQuery()) {
                while (rs.next()) {
                    Evento evento = Evento.createEvento(rs);
                    Map<String, Object> item = new HashMap();
                    item.put("nome", evento.getNome());
                    item.put("aula", evento.getAula().getNome());
                    item.put("id_aula", evento.getAulaKey());
                    item.put("responsabile", evento.getResponsabile().getEmail());
                    item.put("tipo", evento.getTipologia().toString());

                    response.put(evento.getKey(), item);
                }
            }
        } catch (SQLException | ClassNotFoundException ex) {
            throw new RESTWebApplicationException(ex.getMessage());
        } catch (Exception ex) {
            throw new RESTWebApplicationException(ex.getMessage());
        }
        return Response.ok(response).build();
    }

    @Path("current")
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
        } catch (SQLException | ClassNotFoundException ex) {
            throw new RESTWebApplicationException(ex.getMessage());
        } catch (Exception ex) {
            throw new RESTWebApplicationException(ex.getMessage());
        }
    }

    @Path("{name_evento: [A-Za-z][A-Za-z0-9(%20)]*[A-Za-z0-9]}")
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
        } catch (SQLException | ClassNotFoundException ex) {
            throw new RESTWebApplicationException(ex.getMessage());
        } catch (Exception ex) {
            throw new RESTWebApplicationException(ex.getMessage());
        }
    }

    @Path("{id_aula: [0-9]+}/{week: \\d{4}-W\\d{2}}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getEventiByAulaAndWeek(
            @PathParam("id_aula") int aulaKey,
            @PathParam("week") String week
    ) {
        Map<Integer, Object> response = new HashMap();
        int index = 0;
        try {
            PreparedStatement eventiByAulaIdAndPeriod = DBConnection.getConnection().prepareStatement("SELECT * FROM Evento WHERE ID_aula = ? AND (data_evento BETWEEN (? - interval 1 day) AND ?) AND data_evento >= CURDATE()");
            PreparedStatement eventiRicorrentiByAulaIdAndPeriod = DBConnection.getConnection().prepareStatement("SELECT EV.* FROM Evento E, Evento_ricorrente EV WHERE EV.ID_evento = E.ID AND E.ID_aula = ? AND (EV.data_evento BETWEEN ? AND ?) AND EV.data_evento >= CURDATE()");

            //ricaviamo il periodo di nostro interesse
            String settimana[] = week.split("-W");

            Calendar calendar = Calendar.getInstance();
            calendar.clear();
            calendar.set(Calendar.YEAR, Integer.parseInt(settimana[0]));
            calendar.set(Calendar.WEEK_OF_YEAR, Integer.parseInt(settimana[1]));

            LocalDate dataInizio = calendar.getTime().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            LocalDate dataFine = dataInizio.plusDays(6);

            //ricaviamo gli eventi principali
            List<Evento> eventi = new ArrayList();
            eventiByAulaIdAndPeriod.setInt(1, aulaKey);
            eventiByAulaIdAndPeriod.setDate(2, Date.valueOf(dataInizio));
            eventiByAulaIdAndPeriod.setDate(3, Date.valueOf(dataFine));
            try ( ResultSet rs = eventiByAulaIdAndPeriod.executeQuery()) {
                while (rs.next()) {
                    eventi.add(Evento.createEvento(rs));
                }
            }
            eventiRicorrentiByAulaIdAndPeriod.setInt(1, aulaKey);
            eventiRicorrentiByAulaIdAndPeriod.setDate(2, Date.valueOf(dataInizio));
            eventiRicorrentiByAulaIdAndPeriod.setDate(3, Date.valueOf(dataFine));
            try ( ResultSet rs = eventiRicorrentiByAulaIdAndPeriod.executeQuery()) {
                while (rs.next()) {
                    EventoRicorrente e = EventoRicorrente.createEventoRicorrente(rs);
                    Evento ev = e.getEvento();
                    ev.setDataEvento(e.getDataEvento());
                    eventi.add(ev);
                }
            }
            Collections.sort(eventi, new EventoComparator());
            for (Evento evento : eventi) {
                Map<String, Object> item = new HashMap();
                item.put("ID_evento", evento.getKey());
                item.put("nome", evento.getNome());
                item.put("responsabile", evento.getResponsabile().getEmail());
                item.put("data", evento.getDataEvento().toString());
                item.put("ora_inizio", evento.getOraInizio().toString());
                item.put("ora_fine", evento.getOraFine().toString());

                response.put(index, item);
                index++;

            }
            return Response.ok(response).build();

        } catch (SQLException | ClassNotFoundException ex) {
            throw new RESTWebApplicationException(ex.getMessage());
        } catch (Exception ex) {
            throw new RESTWebApplicationException(ex.getMessage());
        }

    }

    @Path("{search:[A-Za-z0-9(%20)]*}/dynamic")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getEventiByDynamicSearch(
            @PathParam("search") String search) {
 
        Map<Integer, Map<String, Object>> response = new HashMap();
        try {
            PreparedStatement eventiByDynamicSearch = DBConnection.getConnection().prepareStatement("SELECT E.* FROM Evento E, Evento_ricorrente EV WHERE"
                    + " substring(E.nome,1,?) = ? AND ((E.data_evento > CURDATE() OR (E.data_evento = CURDATE() AND E.ora_inizio >= CURTIME())) OR (E.ID=EV.ID_evento AND ((EV.data_evento > CURDATE()) OR (EV.data_evento = CURDATE() AND E.ora_inizio >= CURTIME())))) GROUP BY E.ID");
            // da vedere
            eventiByDynamicSearch.setInt(1, search.length());
            eventiByDynamicSearch.setString(2, search);
            try ( ResultSet rs = eventiByDynamicSearch.executeQuery()) {
                while (rs.next()) {
                    Evento evento = Evento.createEvento(rs);
                    Map<String, Object> item = new HashMap();
                    item.put("nome", evento.getNome());
                    item.put("aula", evento.getAula().getNome());
                    item.put("id_aula", evento.getAulaKey());
                    item.put("responsabile", evento.getResponsabile().getEmail());
                    item.put("tipo", evento.getTipologia().toString());

                    response.put(evento.getKey(), item);
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
