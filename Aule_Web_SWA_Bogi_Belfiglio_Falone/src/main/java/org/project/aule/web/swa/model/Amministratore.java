/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.project.aule.web.swa.model;

import java.sql.ResultSet;

public class Amministratore {

    private String username;
    private String password;

    public Amministratore() {
        username = "";
        password = "";
    }

    public String getUsername() {
        return this.username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public static Amministratore createAmministratore(ResultSet rs) throws Exception {
        Amministratore amministratore = new Amministratore();
        amministratore.setUsername(rs.getString("username"));
        amministratore.setPassword(rs.getString("psw"));
        return amministratore;
    }

}
