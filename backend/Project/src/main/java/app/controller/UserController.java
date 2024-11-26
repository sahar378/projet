package app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import app.models.User;
import app.playload.request.SignupRequest;

import app.service.UserService;



@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000") 
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody SignupRequest signupRequest) {
        String result = userService.registerUser(signupRequest);
        if (result.equals("Utilisateur créé avec succès")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(400).body(result);
        }
    }
    /*
    @GetMapping
    @PreAuthorize("hasRole('USER')")
    public List<User> getAllUsers() {
        List<User> users = userService.getAllUsers();
        if (users.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NO_CONTENT, "Aucun utilisateur trouvé");
        }
        return users;
    }*/


}

/*UserController.java :
 *  Li yet7akkem fil utilisateurs (par exemple,
 *   lister les users walla zyada users jdoud).
*/
