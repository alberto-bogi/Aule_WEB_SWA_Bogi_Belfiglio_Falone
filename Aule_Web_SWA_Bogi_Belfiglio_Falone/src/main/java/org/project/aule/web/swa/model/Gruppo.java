/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.project.aule.web.swa.model;

import java.sql.ResultSet;
import java.sql.SQLException;


public class Gruppo{
    
    private String tipoGruppo;
    private String nome;
    private String descrizione;
    
    public Gruppo() {
        tipoGruppo = "";
        nome = "";
        descrizione = "";
    }

    public String getTipoGruppo() {
        return this.tipoGruppo;
    }

    public void setTipoGruppo(String tipoGruppo) {
        this.tipoGruppo = tipoGruppo;
    }

    public String getNome() {
        return this.nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescrizione() {
        return this.descrizione;
    }

    public void setDescrizione(String descrizione) {
        this.descrizione = descrizione;
    }
    
    public static Gruppo createGruppo(ResultSet rs)throws Exception {
        try {
            Gruppo gruppo = new Gruppo();
            gruppo.setNome(rs.getString("nome"));
            gruppo.setTipoGruppo(rs.getString("tipo"));
            return gruppo;
        } catch (SQLException ex) {
            throw new Exception("Impossibile creare l'oggetto Gruppo dal ResultSet", ex);
        }

    }
    
}
