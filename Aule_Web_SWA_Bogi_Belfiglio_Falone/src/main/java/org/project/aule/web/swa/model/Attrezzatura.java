/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.project.aule.web.swa.model;

import java.sql.ResultSet;
import java.sql.SQLException;

public class Attrezzatura {

    private Aula aula;
    private String nome;
    private String numeroDiSerie;

    public Attrezzatura() {
        aula = null;
        nome = "";
        numeroDiSerie = null;
    }

    public Aula getAula() {
        return this.aula;
    }

    public void setAula(Aula aula) {
        this.aula = aula;
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

    public static Attrezzatura createAttrezzatura(ResultSet rs)throws Exception {
        try {
            Attrezzatura attrezzatura = new Attrezzatura();
            attrezzatura.setNome(rs.getString("nome"));
            attrezzatura.setNumeroDiSerie(rs.getString("numero_di_serie"));
            return attrezzatura;
        } catch (SQLException ex) {
            throw new Exception("Impossibile creare l'oggetto Attrezzatura dal ResultSet", ex);
        }

    }

}
