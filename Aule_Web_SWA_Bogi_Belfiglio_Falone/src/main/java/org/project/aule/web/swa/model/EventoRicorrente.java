/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.project.aule.web.swa.model;

import java.time.LocalDate;

public class EventoRicorrente{
    
    private LocalDate dataEvento;
    private Evento evento;
    
    public EventoRicorrente(){
        super();
        dataEvento = null;
        evento = null;
    }

    public LocalDate getDataEvento() {
        return dataEvento;
    }

    public void setDataEvento(LocalDate data) {
       this.dataEvento = data;
    }
    
    public Evento getEvento() {
        return evento;
    }

    public void setEvento(Evento evento) {
       this.evento = evento;
    }

}
