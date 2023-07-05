/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.project.aule.web.swa.resources.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

/**
 *
 * @author acer
 */
public class DBConnection {
    private Connection connection;

    public DBConnection() {
        this.connection = null;
        String url = "jdbc:mysql://localhost/aule_web?serverTimezone=UTC";
        String username = "root";
        String password = "password";

        try {
            this.connection = DriverManager.getConnection(url, username, password);
            System.out.println("Connessione al database MySQL stabilita con successo!");
        } catch (SQLException e) {
            System.out.println("Errore durante la connessione al database MySQL: " + e.getMessage());
        }
    }
    
    public Connection getConnection(){
        return this.connection;
    }

}
