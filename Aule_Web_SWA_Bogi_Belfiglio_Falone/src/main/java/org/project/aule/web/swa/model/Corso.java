/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.project.aule.web.swa.model;


import java.sql.ResultSet;
import java.sql.SQLException;
import org.project.aule.web.swa.model.enumerable.TipoLaurea;

public class Corso{
    private int key;
    private String nome;
    private TipoLaurea tipoLaurea;
    private String corsoDiLaurea;
    private int annoDiFrequentazione;
    
    public Corso(){
        super();
        key = 0;
        nome = "";
        corsoDiLaurea = "";
        annoDiFrequentazione = 0;
        tipoLaurea = null;
    }
     
    public int getKey(){
        return this.key;
    }
    
    public String getNome(){
         return this.nome;
     }

    public String getCorsoDiLaurea() {
        return this.corsoDiLaurea;
    }

    public TipoLaurea getTipoLaurea() {
        return this.tipoLaurea;
    }

    public int getAnnoDiFrequentazione() {
        return this.annoDiFrequentazione;
    }
    
    public void setKey(int key){
        this.key=key;
    }

    public void setTipoLaurea(TipoLaurea tipoLaurea) {
        this.tipoLaurea = tipoLaurea;
    }

    public void setCorsoDiLaurea(String corsoDiLaurea) {
        this.corsoDiLaurea = corsoDiLaurea;
        
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setAnnoDiFrequentazione(int annoDiFrequentazione) {
        this.annoDiFrequentazione = annoDiFrequentazione;
    }
    
    
    public static Corso createCorso(ResultSet rs) throws Exception {
        Corso c = new Corso();
        try {
            c.setKey(rs.getInt("ID"));
            c.setNome(rs.getString("nome"));
            if("TRIENNALE".equals(rs.getString("tipo_laurea"))) {
                c.setTipoLaurea(TipoLaurea.TRIENNALE);
            } else if ("MAGISTRALE".equals(rs.getString("tipo_laurea"))) {
                c.setTipoLaurea(TipoLaurea.MAGISTRALE);
            } else {
                c.setTipoLaurea(TipoLaurea.CICLO_UNICO);
            }

 

            c.setCorsoDiLaurea(rs.getString("corso_di_laurea"));
            c.setAnnoDiFrequentazione(rs.getInt("anno_di_frequentazione"));
        } catch (SQLException ex) {
            throw new Exception("Error initializing the data layer", ex);
        }

 

        return c;
    }

   
}
