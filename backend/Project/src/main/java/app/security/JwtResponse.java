package app.security;

import com.fasterxml.jackson.annotation.JsonProperty;

public class JwtResponse {

    private String accessToken; // Utiliser un seul champ pour le token

    @JsonProperty("username")
    private String username;

    public JwtResponse() {}

    // Constructeur avec un seul champ accessToken
    public JwtResponse(String accessToken, String username) {
        this.accessToken = accessToken;
        this.username = username;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
