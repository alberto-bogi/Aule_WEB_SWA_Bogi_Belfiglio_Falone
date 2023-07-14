/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.project.aule.web.swa.resources.csv;
        
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Reader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.commons.csv.CSVPrinter;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;
import org.project.aule.web.swa.model.Attrezzatura;
import org.project.aule.web.swa.model.Aula;
import org.project.aule.web.swa.model.Evento;
import org.project.aule.web.swa.model.Gruppo;

public class CSVResult {

    private static final String[] HEADERS_EVENTO = {"aula", "evento", "tipo", "data", "ora di inizio", "ora di fine"};
    private static final String[] HEADERS_AULA_EXPORT = {"nome", "luogo", "edificio", "piano", "capienza", "prese elettriche", "prese di rete", "note", "responsabile", "attrezzature", "gruppi"};
    private static final String[] HEADERS_AULA_IMPORT = {"nome", "via", "civico","edificio", "piano", "capienza", "prese_elettriche", "prese_di_rete", "note", "responsabile", "attrezzature", "gruppi"};

    public static File createCSVFile(List<Evento> eventi, String path)throws Exception {
        CSVFormat csvFormat = CSVFormat.EXCEL.builder().setHeader(HEADERS_EVENTO).build();
        try ( CSVPrinter printer = new CSVPrinter(new FileWriter(path), csvFormat)) {
            for (Evento e : eventi) {
                printer.printRecord(e.getAula().getNome(), e.getNome(), e.getTipologia().toString(), e.getDataEvento(), e.getOraInizio(), e.getOraFine());
            }
        } catch (IOException ex) {
            ex.printStackTrace();
        }

        return new File(path);
    }

    public static File createCSVAulaFile(Aula aula, List<Attrezzatura> attrezzature, List<Gruppo> gruppi, String path)throws Exception {
        List<String> nomiAttrezzature = new ArrayList<>();
        for (Attrezzatura attrezzatura : attrezzature) {
            nomiAttrezzature.add(attrezzatura.getNome());
        }

        List<String> nomiGruppi = new ArrayList<>();
        for (Gruppo gruppo : gruppi) {
            nomiGruppi.add(gruppo.getNome());
        }

        CSVFormat csvFormat = CSVFormat.EXCEL.builder().setHeader(HEADERS_AULA_EXPORT).build();
        try ( CSVPrinter printer = new CSVPrinter(new FileWriter(path), csvFormat)) {
            printer.printRecord(aula.getNome(), aula.getLuogo(), aula.getEdificio(), aula.getPiano(), aula.getCapienza(),
                    aula.getNumeroPreseElettriche(), aula.getNumeroPreseDiRete(), aula.getNoteGeneriche(), aula.getResponsabile().getEmail(),
                    String.join(",", nomiAttrezzature), String.join(",", nomiGruppi));
        } catch (IOException ex) {
            ex.printStackTrace();
        }

        return new File(path);

    }

    public static Map<String,String> readCSVAulaFile(File file) {
        try {
            Reader in = new FileReader(file);
            Map<String,String> input = new HashMap<>();
            

            CSVFormat csvFormat = CSVFormat.DEFAULT.builder()
                    .setHeader(HEADERS_AULA_IMPORT)
                    .setSkipHeaderRecord(true)
                    .build();

            Iterable<CSVRecord> records = csvFormat.parse(in);

            for (CSVRecord record : records) {
                input.put("nome",record.get("nome"));
                input.put("via",record.get("via"));
                input.put("civico", record.get("civico"));
                input.put("edificio", record.get("edificio"));
                input.put("piano",record.get("piano"));
                input.put("capienza",record.get("capienza"));
                input.put("prese_elettriche",record.get("prese_elettriche"));
                input.put("prese_di_rete",record.get("prese_di_rete"));
                input.put("note",record.get("note"));
                input.put("responsabile",record.get("responsabile"));
                input.put("attrezzature",record.get("attrezzature"));
                //input.put("gruppi",record.get("gruppi"));
                
            }
            
            return input;

        } catch (FileNotFoundException ex) {
            ex.printStackTrace();
        } catch (IOException ex) {
            ex.printStackTrace();
        }
       return null; 
    }

}
