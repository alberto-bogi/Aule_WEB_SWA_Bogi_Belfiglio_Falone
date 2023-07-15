package org.project.aule.web.swa.security;

import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.NewCookie;
import jakarta.ws.rs.core.Response;
import static jakarta.ws.rs.core.Response.Status.UNAUTHORIZED;
import jakarta.ws.rs.core.UriInfo;

/**
 *
 * @author didattica
 */
@Path("auth")
public class AuthenticationRes {

    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public Response login(@Context UriInfo uriinfo,
            //un altro modo per ricevere e iniettare i parametri con JAX-RS...
            @FormParam("username") String username,
            @FormParam("password") String password) {
        try {
            if (AuthHelpers.getInstance().authenticateAdmin(username, password)) {
                String authToken = AuthHelpers.getInstance().issueToken(uriinfo, username);
                return Response.ok(authToken)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + authToken).build();
            }
        } catch (Exception e) {
            //logging dell'errore 
        }
        return Response.status(UNAUTHORIZED).build();
    }

    @DELETE
    @Path("/logout")
    @Logged
    public Response logout(@Context ContainerRequestContext req) {
        //proprietà estratta dall'authorization header 
        //e iniettata nella request dal filtro di autenticazione
        String token = (String) req.getProperty("token");
        if(token != null){
           AuthHelpers.getInstance().revokeToken(token); 
        }
        
        return Response.noContent().build();
    }

    //Metodo per fare "refresh" del token senza ritrasmettere le credenziali
    @GET
    @Path("/refresh")
    @Logged
    public Response refresh(@Context ContainerRequestContext req, @Context UriInfo uriinfo) {
        //proprietà iniettata nella request dal filtro di autenticazione
        String username = (String) req.getProperty("user");
        String authToken = AuthHelpers.getInstance().issueToken(uriinfo, username);
        return Response.ok(authToken)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + authToken).build();

    }
}
