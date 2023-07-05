/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.project.aule.web.swa.model;


public class Gruppo{
    
    private String tipoGruppo;
    private String nome;
    private String descrizione;
    
    public Gruppo() {
        tipoGruppo = null;
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
    
}
