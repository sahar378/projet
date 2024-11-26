package app.service;

import app.models.ERole;
import app.models.Role;
import app.models.User;
import app.playload.request.SignupRequest;
import app.repository.RoleRepository;
import app.repository.UserRepository;
import app.security.JwtResponse;
import app.security.JwtUtils;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    // Constructeur pour l'injection des dépendances
  
    public UserService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder, JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }
    
    
    public List<User> getAllUsers() {
        return userRepository.findAll();  // This calls the findAll method of the UserRepository to get all users
    }

    public String registerUser(SignupRequest request) {
        // Vérifie si l'email existe déjà
        if (userRepository.existsByEmail(request.getEmail())) {
            return "Email déjà utilisé";
        }

        // Crée un nouvel utilisateur
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword())); // Crypter le mot de passe

        // Gère les rôles
        Set<Role> roles = new HashSet<>();
        if (request.getRole() == null || request.getRole().isEmpty()) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Role not found"));
            roles.add(userRole);
        } else {
            request.getRole().forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Role not found"));
                        roles.add(adminRole);
                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Role not found"));
                        roles.add(userRole);
                        break;
                }
            });
        }

        // Log pour vérifier les rôles
        System.out.println("Roles assigned: " + roles);

        user.setRoles(roles);
        userRepository.save(user);

        return "Utilisateur créé avec succès";
    }
    
    
    public JwtResponse authenticateUser(String username, String password) {
        // Vérification de l'existence de l'utilisateur
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        // Vérification du mot de passe
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Mot de passe incorrect");
        }

        // Génération du JWT
        String jwt = jwtUtils.generateJwtToken(username);

        return new JwtResponse(jwt, username);
    }
    

}
