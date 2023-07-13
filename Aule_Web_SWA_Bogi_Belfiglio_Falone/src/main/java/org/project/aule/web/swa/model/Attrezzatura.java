/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.project.aule.web.swa.model;

import java.sql.ResultSet;
import java.sql.SQLException;

public class Attrezzatura {

    private int key;
    private int aulaKey;
    private String nome;
    private String numeroDiSerie;

    public Attrezzatura() {
        key = 0;
        aulaKey = 0;
        nome = "";
        numeroDiSerie = null;
    }

    public int getKey() {
        return this.key;
    }

    public int getAulaKey() {
        return this.aulaKey;
    }

    public void setKey(int key) {
        this.key = key;
    }

    public void setAulaKey(int aulaKey) {
        this.aulaKey = aulaKey;
    }

    public String getNome() {
        return this.nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getNumeroDiSerie() {
        return this.numeroDiSerie;
    }

    public void setNumeroDiSerie(String numeroDiSerie) {
        this.numeroDiSerie = numeroDiSerie;
    }

    public static Attrezzatura createAttrezzatura(ResultSet rs) throws Exception {
        try {
            Attrezzatura attrezzatura = new Attrezzatura();
            attrezzatura.setKey(rs.getInt("ID"));
            attrezzatura.setNome(rs.getString("nome"));
            attrezzatura.setNumeroDiSerie(rs.getString("numero_di_serie"));
            int aulaKey = rs.getInt("ID_aula");
            if (!rs.wasNull()) {
                attrezzatura.setAulaKey(aulaKey);
            } else {
                attrezzatura.setAulaKey(0);
            }
            return attrezzatura;
        } catch (SQLException ex) {
            throw new Exception("Impossibile creare l'oggetto Attrezzatura dal ResultSet", ex);
        }

    }

}
