/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.project.aule.web.swa.model;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.project.aule.web.swa.resources.database.DBConnection;

public class Aula extends DBConnection {

    private int responsabileKey;
    private String nome;
    private String luogo;
    private String edificio;
    private int piano;
    private int capienza;
    private int numeroPreseElettriche;
    private int numeroPreseDiRete;
    private String noteGeneriche;

    public Aula() {
        super();
        responsabileKey = 0;
        nome = "";
        luogo = "";
        edificio = "";
        piano = 0;
        capienza = 0;
        numeroPreseElettriche = 0;
        numeroPreseDiRete = 0;
        noteGeneriche = "";
    }

    public Responsabile getResponsabile() throws Exception {
        if (responsabileKey > 0) {
            try {
                PreparedStatement responsabileById = this.getConnection().prepareStatement("SELECT * FROM Responsabile WHERE ID = ?");
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

    public void setResponsabileKey(int responsabileKey) {
        this.responsabileKey = responsabileKey;
    }

    public String getNome() {
        return this.nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getLuogo() {
        return this.luogo;
    }

    public void setLuogo(String luogo) {
        this.luogo = luogo;
    }

    public String getEdificio() {
        return this.edificio;
    }

    public void setEdificio(String edificio) {
        this.edificio = edificio;
    }

    public int getPiano() {
        return this.piano;
    }

    public void setPiano(int piano) {
        this.piano = piano;
    }

    public int getCapienza() {
        return this.capienza;
    }

    public void setCapienza(int capienza) {
        this.capienza = capienza;
    }

    public int getNumeroPreseElettriche() {
        return this.numeroPreseElettriche;
    }

    public void setNumeroPreseElettriche(int numeroPreseElettriche) {
        this.numeroPreseElettriche = numeroPreseElettriche;
    }

    public int getNumeroPreseDiRete() {
        return this.numeroPreseDiRete;
    }

    public void setNumeroPreseDiRete(int numeroPreseDiRete) {
        this.numeroPreseDiRete = numeroPreseDiRete;
    }

    public String getNoteGeneriche() {
        return this.noteGeneriche;
    }

    public void setNoteGeneriche(String noteGeneriche) {
        this.noteGeneriche = noteGeneriche;
    }

    public static Aula createAula(ResultSet rs) throws Exception {
        try {
            Aula a = new Aula();
            a.setNome(rs.getString("nome"));
            a.setLuogo(rs.getString("luogo"));
            a.setEdificio(rs.getString("edificio"));
            a.setPiano(rs.getInt("piano"));
            a.setCapienza(rs.getInt("capienza"));
            a.setNumeroPreseElettriche(rs.getInt("numero_prese_elettriche"));
            a.setNumeroPreseDiRete(rs.getInt("numero_prese_di_rete"));
            a.setNoteGeneriche(rs.getString("note_generiche"));
            a.setResponsabileKey(rs.getInt("ID_responsabile"));
            return a;
        } catch (SQLException ex) {
            throw new Exception("Impossibile creare oggetto Aula", ex);
        }
        
    }

}
