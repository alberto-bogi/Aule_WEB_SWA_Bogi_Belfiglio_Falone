/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.project.aule.web.swa.model;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Objects;
import org.project.aule.web.swa.exception.RESTWebApplicationException;
import org.project.aule.web.swa.model.enumerable.Ricorrenza;
import org.project.aule.web.swa.model.enumerable.Tipologia;
import org.project.aule.web.swa.resources.database.DBConnection;

public class Evento{

    private String nome;
    private String descrizione;
    private Tipologia tipologia;
    private LocalDate dataEvento;
    private LocalTime oraInizio;
    private LocalTime oraFine;
    private Ricorrenza ricorrenza;
    private LocalDate dataFineRicorrenza;
    private int corsoKey;
    private int aulaKey;
    private int responsabileKey;

    public Evento() {
        nome = "";
        descrizione = "";
        tipologia = null;
        dataEvento = null;
        oraFine = null;
        oraInizio = null;
        ricorrenza = null;
        dataFineRicorrenza = null;
        corsoKey = 0;
        aulaKey = 0;
        responsabileKey = 0;

    }

    public String getNome() {
        return this.nome;
    }

    public String getDescrizione() {
        return this.descrizione;
    }

    public Tipologia getTipologia() {
        return this.tipologia;
    }

    public LocalDate getDataEvento() {
        return this.dataEvento;
    }

    public LocalTime getOraInizio() {
        return this.oraInizio;
    }

    public LocalTime getOraFine() {
        return this.oraFine;
    }

    public Ricorrenza getRicorrenza() {
        return this.ricorrenza;
    }

    public LocalDate getDataFineRicorrenza() {
        return this.dataFineRicorrenza;
    }

    public Corso getCorso() throws Exception {
        if (corsoKey > 0) {
            try {
                PreparedStatement corsoById = DBConnection.getConnection().prepareStatement("SELECT * FROM Corso WHERE ID = ?");
                corsoById.setInt(1, corsoKey);
                try ( ResultSet rs = corsoById.executeQuery()) {
                    if (rs.next()) {
                        return Corso.createCorso(rs);
                    }
                }
            } catch (SQLException ex) {
                throw new Exception(ex);
            }
        }
        return null;
    }

    public Aula getAula() throws Exception {
        if (aulaKey > 0) {
            try {
                PreparedStatement aulaById = DBConnection.getConnection().prepareStatement("SELECT * FROM Aula WHERE ID = ?");
                aulaById.setInt(1, aulaKey);
                try ( ResultSet rs = aulaById.executeQuery()) {
                    if (rs.next()) {
                        return Aula.createAula(rs);
                    }
                }
            } catch (SQLException ex) {
                throw new Exception(ex);
            }
        }
        return null;
    }

    public Responsabile getResponsabile() throws Exception {
        if (responsabileKey > 0) {
            try {
                PreparedStatement responsabileById = DBConnection.getConnection().prepareStatement("SELECT * FROM Responsabile WHERE ID = ?");
                responsabileById.setInt(1, responsabileKey);
                try ( ResultSet rs = responsabileById.executeQuery()) {
                    if (rs.next()) {
                        return Responsabile.createResponsabile(rs);
                    }
                }
            } catch (SQLException ex) {
                throw new Exception(ex);
            }
        }
        return null;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setDescrizione(String descrizione) {
        this.descrizione = descrizione;
    }

    public void setTipologia(Tipologia tipologia) {
        this.tipologia = tipologia;
    }

    public void setDataEvento(LocalDate data) {
        this.dataEvento = data;
    }

    public void setOraInizio(LocalTime orario) {
        this.oraInizio = orario;
    }

    public void setOraFine(LocalTime orario) {
        this.oraFine = orario;
    }

    public void setRicorrenza(Ricorrenza ricorrenza) {
        this.ricorrenza = ricorrenza;
    }

    public void setDataFineRicorrenza(LocalDate data) {
        this.dataFineRicorrenza = data;
    }

    public void setCorsoKey(int corsoKey) {
        this.corsoKey = corsoKey;
    }

    public void setResponsabileKey(int responsabileKey) {
        this.responsabileKey = responsabileKey;
    }

    public void setAulaKey(int aulaKey) {
        this.aulaKey = aulaKey;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }

        Evento evento = (Evento) obj;
        if (!this.getNome().equals(evento.getNome())) {
            return false;
        } else if (!this.getDescrizione().equals(evento.getDescrizione())) {
            return false;
        } else if (!this.getDataEvento().equals(evento.getDataEvento())) {
            return false;
        } else if (!this.getOraFine().equals(evento.getOraFine())) {
            return false;
        } else if (!this.getOraInizio().equals(evento.getOraInizio())) {
            return false;
        } else if (!this.getRicorrenza().equals(evento.getRicorrenza())) {
            return false;
        } else if (!this.getTipologia().equals(evento.getTipologia())) {
            return false;
        } else {
            return true;
        }

    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 59 * hash + Objects.hashCode(this.nome);
        hash = 59 * hash + Objects.hashCode(this.descrizione);
        hash = 59 * hash + Objects.hashCode(this.tipologia);
        hash = 59 * hash + Objects.hashCode(this.dataEvento);
        hash = 59 * hash + Objects.hashCode(this.oraInizio);
        hash = 59 * hash + Objects.hashCode(this.oraFine);
        hash = 59 * hash + Objects.hashCode(this.ricorrenza);
        hash = 59 * hash + Objects.hashCode(this.dataFineRicorrenza);
        return hash;
    }

    public static Evento createEvento(ResultSet rs) throws Exception {
        try {
            Evento evento = new Evento();
            evento.setDataEvento((rs.getDate("data_evento").toLocalDate()));
            evento.setNome(rs.getString("nome"));
            evento.setDescrizione(rs.getString("descrizione"));
            switch (rs.getString("tipologia")) {
                case "LEZIONE":
                    evento.setTipologia(Tipologia.LEZIONE);
                    evento.setCorsoKey(rs.getInt("ID_corso"));
                    break;
                case "ESAME":
                    evento.setTipologia(Tipologia.ESAME);
                    evento.setCorsoKey(rs.getInt("ID_corso"));
                    break;
                case "PARZIALE":
                    evento.setTipologia(Tipologia.PARZIALE);
                    evento.setCorsoKey(rs.getInt("ID_corso"));
                    break;
                case "SEMINARIO":
                    evento.setTipologia(Tipologia.SEMINARIO);
                    evento.setCorsoKey(0);
                    break;
                case "LAUREA":
                    evento.setTipologia(Tipologia.LAUREA);
                    evento.setCorsoKey(0);
                    break;
                case "RIUNIONE":
                    evento.setTipologia(Tipologia.RIUNIONE);
                    evento.setCorsoKey(0);
                    break;
                case "ALTRO":
                    evento.setTipologia(Tipologia.ALTRO);
                    evento.setCorsoKey(0);
                    break;
            }
            if (rs.getString("ricorrenza") != null) {
                switch (rs.getString("ricorrenza")) {
                    case "GIORNALIERA":
                        evento.setRicorrenza(Ricorrenza.GIORNALIERA);
                        evento.setDataFineRicorrenza(rs.getDate("data_fine_ricorrenza").toLocalDate());
                        break;
                    case "SETTIMANALE":
                        evento.setRicorrenza(Ricorrenza.SETTIMANALE);
                        evento.setDataFineRicorrenza(rs.getDate("data_fine_ricorrenza").toLocalDate());
                        break;
                    case "MENSILE":
                        evento.setRicorrenza(Ricorrenza.MENSILE);
                        evento.setDataFineRicorrenza(rs.getDate("data_fine_ricorrenza").toLocalDate());
                        break;
                    case "NESSUNA":
                        evento.setRicorrenza(Ricorrenza.NESSUNA);
                        evento.setDataFineRicorrenza(null);
                        break;
                }

            } else {
                evento.setRicorrenza(null);
                evento.setDataFineRicorrenza(null);
            }
            evento.setOraInizio(rs.getTime("ora_inizio").toLocalTime());
            evento.setOraFine(rs.getTime("ora_fine").toLocalTime());
            evento.setAulaKey(rs.getInt("ID_aula"));
            evento.setResponsabileKey(rs.getInt("ID_responsabile"));

            return evento;
        } catch (SQLException ex) {
            throw new Exception(ex);
        }

    }

}
