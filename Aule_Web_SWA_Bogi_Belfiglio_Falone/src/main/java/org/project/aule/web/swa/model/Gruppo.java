/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.project.aule.web.swa.model;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.project.aule.web.swa.resources.database.DBConnection;

public class Gruppo {

    private int key;
    private String tipoGruppo;
    private String nome;
    private String descrizione;

    public Gruppo() {
        key = 0;
        tipoGruppo = "";
        nome = "";
        descrizione = "";
    }

    public int getKey() {
        return this.key;
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

    public void setKey(int key) {
        this.key = key;
    }

    public void setDescrizione(String descrizione) {
        this.descrizione = descrizione;
    }

    public static Gruppo createGruppoById(Integer id) throws Exception {
        try {
            Gruppo gruppo = new Gruppo();
            PreparedStatement gruppoById = DBConnection.getConnection().prepareStatement("SELECT * FROM Gruppo WHERE ID = ? ");
            gruppoById.setInt(1, id);
            try ( ResultSet rs = gruppoById.executeQuery()) {
                if (rs.next()) {
                    gruppo = Gruppo.createGruppo(rs);

                }
            }
            return gruppo;
        } catch (SQLException ex) {
            throw new Exception("Impossibile creare l'oggetto Gruppo da questo ID", ex);
        }

    }

    public static Gruppo createGruppo(ResultSet rs) throws Exception {
        try {
            Gruppo gruppo = new Gruppo();
            gruppo.setKey(rs.getInt("ID"));
            gruppo.setNome(rs.getString("nome"));
            gruppo.setTipoGruppo(rs.getString("tipo"));
            return gruppo;
        } catch (SQLException ex) {
            throw new Exception("Impossibile creare l'oggetto Gruppo dal ResultSet", ex);
        }

    }

}
