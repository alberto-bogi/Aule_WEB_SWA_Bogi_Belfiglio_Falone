/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.project.aule.web.swa.resources;

import jakarta.servlet.ServletContext;
import jakarta.servlet.annotation.ServletSecurity;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriInfo;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URI;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import net.fortuna.ical4j.data.CalendarOutputter;
import net.fortuna.ical4j.model.DateTime;
import net.fortuna.ical4j.model.TimeZone;
import net.fortuna.ical4j.model.TimeZoneRegistry;
import net.fortuna.ical4j.model.TimeZoneRegistryFactory;
import net.fortuna.ical4j.model.component.VEvent;
import net.fortuna.ical4j.model.component.VTimeZone;
import net.fortuna.ical4j.model.property.CalScale;
import net.fortuna.ical4j.model.property.Description;
import net.fortuna.ical4j.model.property.ProdId;
import net.fortuna.ical4j.model.property.Uid;
import net.fortuna.ical4j.model.property.Version;
import net.fortuna.ical4j.util.UidGenerator;
import org.glassfish.jersey.server.Uri;
import org.project.aule.web.swa.exception.RESTWebApplicationException;
import org.project.aule.web.swa.model.Aula;
import org.project.aule.web.swa.model.Corso;
import org.project.aule.web.swa.model.Evento;
import org.project.aule.web.swa.model.EventoRicorrente;
import org.project.aule.web.swa.model.Responsabile;
import org.project.aule.web.swa.model.enumerable.Ricorrenza;
import org.project.aule.web.swa.model.enumerable.Tipologia;
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
            PreparedStatement allEventi = DBConnection.getConnection().prepareStatement("SELECT E.* FROM Evento E WHERE"
                    + "(E.data_evento > CURDATE() OR (E.data_evento = CURDATE() AND E.ora_inizio >= CURTIME()))");
            PreparedStatement allEventiRicorrenti = DBConnection.getConnection().prepareStatement("SELECT E.* FROM Evento E, Evento_ricorrente EV "
                    + "WHERE ((E.ID = EV.ID_evento) AND ((EV.data_evento > CURDATE()) OR (EV.data_evento = CURDATE() AND E.ora_inizio > CURTIME())))");
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
            try ( ResultSet rs2 = allEventiRicorrenti.executeQuery()) {
                while (rs2.next()) {
                    Evento evento = Evento.createEvento(rs2);
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
                    response.put("ID", evento.getKey());
                    response.put("nome", evento.getNome());
                    response.put("descrizione", evento.getDescrizione());
                    response.put("data", evento.getDataEvento().toString());
                    response.put("ora_inizio", evento.getOraInizio().toString());
                    response.put("ora_fine", evento.getOraFine().toString());
                    response.put("aula", evento.getAula().getNome());
                    response.put("responsabile", evento.getResponsabile().getEmail());
                    response.put("tipo", evento.getTipologia().toString());
                    response.put("id_aula", evento.getAulaKey());
                    response.put("id_corso", evento.getCorsoKey());
                    response.put("id_responsabile", evento.getResponsabileKey());
                    if (evento.getCorsoKey() > 0) {
                        response.put("corso", evento.getCorso().getNome());
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

    @Logged
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addEvento(
            @Context ContainerRequestContext req,
            @Context UriInfo uriinfo,
            Map<String, Object> eventoJson
    ) {
        try {
            if (req.getProperty("token") == null) {
                throw new RESTWebApplicationException();
            }
            URI uri;
            PreparedStatement insertEvento = DBConnection.getConnection().prepareStatement("INSERT INTO Evento"
                    + "(nome, descrizione, tipologia, data_evento, ora_inizio, ora_fine, ricorrenza, data_fine_ricorrenza, ID_corso, "
                    + "ID_responsabile, ID_aula) VALUES (?,?,?,?,?,?,?,?,?,?,?)", Statement.RETURN_GENERATED_KEYS);
            insertEvento.setString(1, eventoJson.get("nome").toString());
            insertEvento.setString(2, eventoJson.get("descrizione").toString());
            insertEvento.setDate(4, Date.valueOf(eventoJson.get("data_evento").toString()));
            insertEvento.setTime(5, Time.valueOf(eventoJson.get("ora_inizio").toString() + ":00"));
            insertEvento.setTime(6, Time.valueOf(eventoJson.get("ora_fine").toString() + ":00"));
            insertEvento.setInt(10, Integer.parseInt(eventoJson.get("id_responsabile").toString()));
            insertEvento.setInt(11, Integer.parseInt(eventoJson.get("id_aula").toString()));

            switch (Integer.parseInt(eventoJson.get("tipologia").toString())) {
                case 1:
                    insertEvento.setString(3, "LEZIONE");
                    insertEvento.setInt(9, Integer.parseInt(eventoJson.get("id_corso").toString()));
                    break;
                case 2:
                    insertEvento.setString(3, "ESAME");
                    insertEvento.setInt(9, Integer.parseInt(eventoJson.get("id_corso").toString()));
                    break;
                case 3:
                    insertEvento.setString(3, "PARZIALE");
                    insertEvento.setInt(9, Integer.parseInt(eventoJson.get("id_corso").toString()));
                case 4:
                    insertEvento.setString(3, "SEMINARIO");
                    insertEvento.setNull(9, java.sql.Types.INTEGER);
                    break;
                case 5:
                    insertEvento.setString(3, "RIUNIONE");
                    insertEvento.setNull(9, java.sql.Types.INTEGER);
                    break;
                case 6:
                    insertEvento.setString(3, "LAUREA");
                    insertEvento.setNull(9, java.sql.Types.INTEGER);
                    break;
                case 7:
                    insertEvento.setString(3, "ALTRO");
                    insertEvento.setNull(9, java.sql.Types.INTEGER);
                    break;
            }

            switch (Integer.parseInt(eventoJson.get("ricorrenza").toString())) {
                case 1:
                    insertEvento.setString(7, "GIORNALIERA");
                    insertEvento.setDate(8, Date.valueOf(eventoJson.get("data_ricorrenza").toString()));
                    break;
                case 2:
                    insertEvento.setString(7, "SETTIMANALE");
                    insertEvento.setDate(8, Date.valueOf(eventoJson.get("data_ricorrenza").toString()));
                    break;
                case 3:
                    insertEvento.setString(7, "MENSILE");
                    insertEvento.setDate(8, Date.valueOf(eventoJson.get("data_ricorrenza").toString()));
                    break;
                case 4:
                    insertEvento.setString(7, "NESSUNA");
                    insertEvento.setNull(8, java.sql.Types.DATE);
                    break;
            }
            if (insertEvento.executeUpdate() == 1) {
                try ( ResultSet keys = insertEvento.getGeneratedKeys()) {

                    if (keys.next()) {
                        int key = keys.getInt(1);
                        uri = uriinfo.getBaseUriBuilder()
                                .path(getClass())
                                .path(getClass(), "getEvento")
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

    @Logged
    @Path("{id_evento: [0-9]+}")
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public Response modifyEvento(
            @Context ContainerRequestContext req,
            @Context UriInfo uriinfo,
            @PathParam("id_evento") int eventoKey,
            Map<String, Object> eventoJson
    ) {
        try {
            if (req.getProperty("token") == null) {
                throw new RESTWebApplicationException();
            }
            URI uri;
            PreparedStatement updateEvento = DBConnection.getConnection().prepareStatement("UPDATE Evento SET nome = ?, descrizione = ?, "
                    + "tipologia = ?, data_evento = ?, ora_inizio = ?, ora_fine = ?, ricorrenza = ?, data_fine_ricorrenza = ?, "
                    + "ID_corso = ?, ID_responsabile =?, ID_aula = ? WHERE ID = ?");
            updateEvento.setString(1, eventoJson.get("nome").toString());
            updateEvento.setString(2, eventoJson.get("descrizione").toString());
            updateEvento.setDate(4, Date.valueOf(eventoJson.get("data_evento").toString()));
            updateEvento.setTime(5, Time.valueOf(eventoJson.get("ora_inizio").toString() + ":00"));
            updateEvento.setTime(6, Time.valueOf(eventoJson.get("ora_fine").toString() + ":00"));
            updateEvento.setInt(10, Integer.parseInt(eventoJson.get("id_responsabile").toString()));
            updateEvento.setInt(11, Integer.parseInt(eventoJson.get("id_aula").toString()));
            updateEvento.setInt(12, eventoKey);

            switch (Integer.parseInt(eventoJson.get("tipologia").toString())) {
                case 1:
                    updateEvento.setString(3, "LEZIONE");
                    updateEvento.setInt(9, Integer.parseInt(eventoJson.get("id_corso").toString()));
                    break;
                case 2:
                    updateEvento.setString(3, "ESAME");
                    updateEvento.setInt(9, Integer.parseInt(eventoJson.get("id_corso").toString()));
                    break;
                case 3:
                    updateEvento.setString(3, "PARZIALE");
                    updateEvento.setInt(9, Integer.parseInt(eventoJson.get("id_corso").toString()));
                    break;
                case 4:
                    updateEvento.setString(3, "SEMINARIO");
                    updateEvento.setNull(9, java.sql.Types.INTEGER);
                    break;
                case 5:
                    updateEvento.setString(3, "RIUNIONE");
                    updateEvento.setNull(9, java.sql.Types.INTEGER);
                    break;
                case 6:
                    updateEvento.setString(3, "LAUREA");
                    updateEvento.setNull(9, java.sql.Types.INTEGER);
                    break;
                case 7:
                    updateEvento.setString(3, "ALTRO");
                    updateEvento.setNull(9, java.sql.Types.INTEGER);
                    break;
            }

            switch (Integer.parseInt(eventoJson.get("ricorrenza").toString())) {
                case 1:
                    updateEvento.setString(7, "GIORNALIERA");
                    updateEvento.setDate(8, Date.valueOf(eventoJson.get("data_ricorrenza").toString()));
                    break;
                case 2:
                    updateEvento.setString(7, "SETTIMANALE");
                    updateEvento.setDate(8, Date.valueOf(eventoJson.get("data_ricorrenza").toString()));
                    break;
                case 3:
                    updateEvento.setString(7, "MENSILE");
                    updateEvento.setDate(8, Date.valueOf(eventoJson.get("data_ricorrenza").toString()));
                    break;
                case 4:
                    updateEvento.setString(7, "NESSUNA");
                    updateEvento.setNull(8, java.sql.Types.DATE);
                    break;
            }
            if (updateEvento.executeUpdate() == 1) {
                uri = uriinfo.getBaseUriBuilder()
                        .path(getClass())
                        .path(getClass(), "getEvento")
                        .build(eventoKey);
                return Response.created(uri).build();
            }

        } catch (SQLException | ClassNotFoundException ex) {
            throw new RESTWebApplicationException(ex.getMessage());
        }

        throw new RESTWebApplicationException();

    }

    @Path("calendar/export")
    @POST
    public Response exportEventiByPeriod(
            @Context ServletContext sc,
            Map<String, Object> periodoJson
    ) {
        File response = new File(sc.getRealPath("") + File.separatorChar + "eventi.ics");
        // Create a calendar
        net.fortuna.ical4j.model.Calendar eventiCalendar = new net.fortuna.ical4j.model.Calendar();
        eventiCalendar.getProperties().add(new ProdId("-//Events Calendar//iCal4j 1.0//EN"));
        eventiCalendar.getProperties().add(CalScale.GREGORIAN);
        eventiCalendar.getProperties().add(Version.VERSION_2_0);

        // Create a TimeZone
        TimeZoneRegistry registry = TimeZoneRegistryFactory.getInstance().createRegistry();
        TimeZone timezone = registry.getTimeZone("Europe/Rome");
        VTimeZone tz = timezone.getVTimeZone();

        try {

            List<Evento> eventi = new ArrayList();
            PreparedStatement getEventiByPeriod = DBConnection.getConnection().prepareStatement("SELECT * FROM EVENTO WHERE data_evento BETWEEN ? AND ?;");
            PreparedStatement getEventiRicorrentiByPeriod = DBConnection.getConnection().prepareStatement("SELECT * FROM EVENTO_RICORRENTE  WHERE data_evento BETWEEN ? AND ?;");

            LocalDate data_inizio = LocalDate.parse(periodoJson.get("data_inizio").toString());
            LocalDate data_fine = LocalDate.parse(periodoJson.get("data_fine").toString());
            getEventiByPeriod.setDate(1, Date.valueOf(data_inizio));
            getEventiByPeriod.setDate(2, Date.valueOf(data_fine));
            getEventiRicorrentiByPeriod.setDate(1, Date.valueOf(data_inizio));
            getEventiRicorrentiByPeriod.setDate(2, Date.valueOf(data_fine));
            try ( ResultSet rs = getEventiByPeriod.executeQuery()) {
                while (rs.next()) {
                    Evento evento = Evento.createEvento(rs);
                    eventi.add(evento);
                }
            }
            try ( ResultSet rs2 = getEventiRicorrentiByPeriod.executeQuery()) {
                while (rs2.next()) {
                    EventoRicorrente eventoRicorrente = EventoRicorrente.createEventoRicorrente(rs2);
                    Evento evento = eventoRicorrente.getEvento();
                    evento.setDataEvento(eventoRicorrente.getDataEvento());
                    eventi.add(evento);
                }

            }
            Collections.sort(eventi, new EventoComparator());
            for (Evento evento : eventi) {
                LocalDate data_evento = evento.getDataEvento();
                LocalTime ora_inizio = evento.getOraInizio();
                LocalTime ora_fine = evento.getOraFine();

                Calendar start_event = new GregorianCalendar();
                start_event.setTimeZone(timezone);
                start_event.set(data_evento.getYear(), data_evento.getMonthValue() - 1, data_evento.getDayOfMonth(), ora_inizio.getHour(), ora_inizio.getMinute());

                Calendar end_event = new GregorianCalendar();
                end_event.setTimeZone(timezone);
                end_event.set(data_evento.getYear(), data_evento.getMonthValue() - 1, data_evento.getDayOfMonth(), ora_fine.getHour(), ora_fine.getMinute());

                //creaimo l'evento per il calendario
                DateTime start = new DateTime(start_event.getTime());
                DateTime end = new DateTime(end_event.getTime());
                VEvent calendarEvent = new VEvent(start, end, evento.getNome());
                calendarEvent.getProperties().add(new Description("AULA " + evento.getAula().getNome().toUpperCase() +
                        ": " + evento.getDescrizione().toUpperCase()));
                        

                // add timezone info..
                calendarEvent.getProperties().add(tz.getTimeZoneId());

                // generate unique identifier..
                UidGenerator ug = new UidGenerator("uidGen");
                Uid uid = ug.generateUid();
                calendarEvent.getProperties().add(uid);

                eventiCalendar.getComponents().add(calendarEvent);
            }

            FileOutputStream fout = new FileOutputStream(response);

            CalendarOutputter outputter = new CalendarOutputter();
            outputter.output(eventiCalendar, fout);

            return Response.ok(response).build();
        } catch (SQLException | ClassNotFoundException | FileNotFoundException ex) {
            throw new RESTWebApplicationException(ex.getMessage());
        } catch (Exception ex) {
            throw new RESTWebApplicationException(ex.getMessage());
        }
    }
}
