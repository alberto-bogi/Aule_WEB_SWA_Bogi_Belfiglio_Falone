/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.project.aule.web.swa.model;

import java.sql.ResultSet;
import java.sql.SQLException;

public class Responsabile {

    private String nome;
    private String cognome;
    private String codiceFiscale;
    private String email;

    public Responsabile() {
        super();
        nome = "";
        cognome = "";
        codiceFiscale = "";
        email = "";
    }

    public String getNome() {
        return this.nome;
    }

    public String getCognome() {
        return this.cognome;
    }

    public String getCodiceFiscale() {
        return this.codiceFiscale;
    }

    public String getEmail() {
        return this.email;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setCognome(String cognome) {
        this.cognome = cognome;
    }

    public void setCodiceFiscale(String cf) {
        this.codiceFiscale = cf;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public static Responsabile createResponsabile(ResultSet rs) throws Exception {
        Responsabile r = new Responsabile();
        try {
            r.setNome(rs.getString("nome"));
            r.setCognome(rs.getString("cognome"));
            r.setCodiceFiscale(rs.getString("codice_fiscale"));
            r.setEmail(rs.getString("email"));
        } catch (SQLException ex) {
            throw new Exception("Impossibile creare l'oggetto Responsabile dal ResultSet", ex);
        }
        return r;
    }

    
}
