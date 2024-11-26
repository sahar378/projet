package app.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/users/register", "/api/auth/login", "/api/signup").permitAll()
                .anyRequest().authenticated()
            );
        return http.build();
    }
    
   
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
            .authorizeRequests()
            .requestMatchers("/api/users/**").hasRole("USER")  // Restrict access to users with role USER
            .anyRequest().authenticated()
            .and()
            .oauth2ResourceServer().jwt();  // Assurez-vous que vous utilisez OAuth2 et JWT
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder = 
            http.getSharedObject(AuthenticationManagerBuilder.class);
        return authenticationManagerBuilder.build();
    }
    
    /*
      @Bean
public AuthenticationManager authenticationManager(AuthenticationManagerBuilder authBuilder) throws Exception {
    authBuilder
        .inMemoryAuthentication()
        .withUser("user") // Nom d'utilisateur
            .password(passwordEncoder().encode("password")) // Mot de passe encodé
            .roles("USER") // Rôle
        .and()
        .withUser("admin")
            .password(passwordEncoder().encode("adminpassword"))
            .roles("ADMIN");
    return authBuilder.build();
}


              de preference nst3ml hedhill gestion de user  tw nchoufha b3d 

     */

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}





/*SecurityConfig.java :
 *  Houni ta3mél les règles ta3 sécurité mta3 el projet : 
 *  par exemple kifésh tetsarraf b JWT (token), 
 *  w les permissions mta3 user/Admin.
 */
