/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.project.aule.web.swa.model;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import org.project.aule.web.swa.resources.database.DBConnection;

public class EventoRicorrente{
    
    private LocalDate dataEvento;
    private int eventoKey;
    
    public EventoRicorrente(){
        super();
        dataEvento = null;
        eventoKey = 0;
    }

    public LocalDate getDataEvento() {
        return dataEvento;
    }

    public void setDataEvento(LocalDate data) {
       this.dataEvento = data;
    }
    
    public int getEventoKey() {
        return eventoKey;
    }

    public void setEventoKey(int eventoKey) {
       this.eventoKey = eventoKey;
    }
    
    public Evento getEvento()throws Exception{
        if (eventoKey > 0) {
            try {
                PreparedStatement eventoById = DBConnection.getConnection().prepareStatement("SELECT * FROM Evento WHERE ID = ?");
                eventoById.setInt(1, eventoKey);
                try ( ResultSet rs = eventoById.executeQuery()) {
                    if (rs.next()) {
                        return Evento.createEvento(rs);
                    }
                }
            } catch (SQLException ex) {
                throw new Exception(ex);
            }
        } 
        return null;
    }
    
    public static EventoRicorrente createEventoRicorrente(ResultSet rs) throws Exception {
        EventoRicorrente ev = new EventoRicorrente();
        try {
            ev.setDataEvento(rs.getDate("data_evento").toLocalDate());
            ev.setEventoKey(rs.getInt("ID_evento"));
        } catch (SQLException ex) {
            throw new Exception("Impossibile creare l'oggetto EventoRicorrente dal ResultSet", ex);
        }
        return ev;
    }

}
