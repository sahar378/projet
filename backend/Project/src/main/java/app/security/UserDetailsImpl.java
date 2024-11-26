package app.security;

import org.springframework.security.core.GrantedAuthority;


import java.util.Collection;


public class UserDetailsImpl  {
    private String username;
    private String password;
    private Collection<? extends GrantedAuthority> authorities;

    public UserDetailsImpl(String username, String password, Collection<? extends GrantedAuthority> authorities) {
        this.username = username;
        this.password = password;
        this.authorities = authorities;
    }

  
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

   
    public String getPassword() {
        return password;
    }

    public String getUsername() {
        return username;
    }

    
    public boolean isAccountNonExpired() {
        return true;
    }

    
    public boolean isAccountNonLocked() {
        return true;
    }

    
    public boolean isCredentialsNonExpired() {
        return true;
    }

   
    public boolean isEnabled() {
        return true;
    }
}

/*UserDetailsImpl.java :
 *  Ye3mel mapping bin el token w el user li mawjoud fi database.
*/
