package app.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;

@Component
public class JwtUtils {
	

	  private final SecretKey secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS512);

    @Value("${jwt.expirationMs}")
    private long jwtExpirationMs;
    

    // Generate JWT token for the given username
    public String generateJwtToken(String username) {
        return Jwts.builder() //C'est le point de départ pour construire le token JWT.
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + jwtExpirationMs)) // Set expiration time
                .signWith(secretKey)
  // Signing with secret key
                .compact(); //Cette méthode génère le JWT compacté sous forme de chaîne de caractères.
    }

    // Validate the given JWT token
    public boolean validateJwtToken(String token) {
        try {
        	Jwts.parserBuilder() //Cela initialise un parseur pour le token JWT, avec la clé secrète pour vérifier la signature du token.
            .setSigningKey(secretKey)
            .build()
            .parseClaimsJws(token);

            return true;
        } catch (JwtException | IllegalArgumentException e) {
            System.err.println("Invalid JWT token: " + e.getMessage());
        }
        return false;
    }

    // Extract the username from the JWT token
    public String getUsernameFromJwtToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)  // Use the secret key to parse
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
    
    

}



/*JwtUtils.java :
 *  Houni yet3amel m3a el tokens (génération, 
 *  validation, w extraction mta3 data comme username).*/
