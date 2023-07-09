package org.project.aule.web.swa.security;

import jakarta.ws.rs.core.UriInfo;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.project.aule.web.swa.exception.RESTWebApplicationException;
import org.project.aule.web.swa.model.Amministratore;
import org.project.aule.web.swa.resources.database.DBConnection;

/**
 *
 * Una classe di utilità di supporto all'autenticazione qui usiamo JWT per tutte
 * le operazioni
 *
 */
public class AuthHelpers {

    private static AuthHelpers instance = null;
    private final JWTHelpers jwt;

    public AuthHelpers() {
        jwt = JWTHelpers.getInstance();
    }

    public boolean authenticateAdmin(String username, String password) {
        Amministratore amministratore = new Amministratore();
        try ( PreparedStatement adminByUserPass = DBConnection.getConnection().prepareStatement("SELECT * FROM Amministratore WHERE username = ?")) {
            adminByUserPass.setString(1, username);
            try ( ResultSet rs = adminByUserPass.executeQuery()) {
                if (rs.next()) {
                    amministratore = Amministratore.createAmministratore(rs);
                    if (amministratore != null && SecurityHelpers.checkPasswordHashPBKDF2(password, amministratore.getPassword())) {
                        return true;
                    }else{
                        return false;
                    }
                }
            }
        } catch (Exception ex) {
            throw new RESTWebApplicationException(ex.getMessage());
        }
        return false;
    }

    public String issueToken(UriInfo context, String username) {
        return jwt.issueToken(context, username);
    }

    public void revokeToken(String token) {
        jwt.revokeToken(token);
    }

    public String validateToken(String token) {
        return jwt.validateToken(token);
    }

    public static AuthHelpers getInstance() {
        if (instance == null) {
            instance = new AuthHelpers();
        }
        return instance;
    }

}
