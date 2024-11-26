package app.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import app.playload.request.LoginRequest;
import app.playload.request.SignupRequest;
import app.playload.response.MessageResponse;
import app.security.JwtResponse;
import app.security.JwtUtils;
import app.service.UserService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "  http://localhost:3000") 
public class AuthController {

    private final AuthenticationManager authenticationManager;//AuthenticationManager : Gère l'authentification des utilisateurs.
    private final JwtUtils jwtUtils; //JwtUtils : Utilisé pour la génération et la validation des tokens JWT.
    private final UserService userService; //UserService : Contient la logique métier pour l'authentification et l'inscription des utilisateurs.

    // L'injection du AuthenticationManager se fait ici grâce à Spring
    public AuthController(AuthenticationManager authenticationManager, JwtUtils jwtUtils, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody @Valid LoginRequest loginRequest) {
        try {
            // Appel du service pour l'authentification
            JwtResponse jwtResponse = userService.authenticateUser(loginRequest.getUsername(), loginRequest.getPassword());

            // Renvoi du token JWT et du nom d'utilisateur dans la réponse
            return ResponseEntity.ok(jwtResponse);
        } catch (Exception e) {
            // En cas d'échec de l'authentification
            return ResponseEntity.badRequest().body(new MessageResponse("Authentication failed: " + e.getMessage()));
        }
    }
    

    
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/register")
    public String register(@RequestBody SignupRequest request) {
        return userService.registerUser(request);
    }
    
    
}

/*AuthController.java : 
 * Ce fichier houwa el service li yet7akkem fil authentification. Par exemple, POST /signin bech yetsajel user ou POST /register bech yrajistra utilisateur jdida.*/
