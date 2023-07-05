/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.project.aule.web.swa.jackson;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import java.io.IOException;
import org.project.aule.web.swa.model.Evento;

/**
 *
 * @author acer
 */
public class EventoSerializer extends JsonSerializer<Evento> {

    @Override
    public void serialize(Evento evento, JsonGenerator jg, SerializerProvider sp) throws IOException {
        try {
            jg.writeStartObject(); // {
            jg.writeStringField("nome", evento.getNome()); // "nome": ...
            jg.writeStringField("descrizione", evento.getDescrizione());
            jg.writeStringField("tipologia", evento.getTipologia().toString());
            if (evento.getCorso() != null) {
                jg.writeObjectField("corso", evento.getCorso().getNome());
            }
            jg.writeObjectField("data", evento.getDataEvento()); // "data": ...
            jg.writeObjectFieldStart("intervallo"); // "intervallo": {
            jg.writeObjectField("inizio", evento.getOraInizio()); // "inizio": ....
            jg.writeObjectField("fine", evento.getOraFine()); // "fine": ...
            jg.writeEndObject(); // }
            jg.writeObjectField("aula", evento.getAula().getNome());
            jg.writeEndObject();

        } catch (Exception ex) {
            ex.printStackTrace();
        }

    }
}
