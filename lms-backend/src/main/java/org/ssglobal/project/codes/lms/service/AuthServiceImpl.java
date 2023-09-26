package org.ssglobal.project.codes.lms.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.ssglobal.project.codes.lms.models.tables.records.UsersRecord;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class AuthServiceImpl implements UserDetailsService {

   private final AuthService authService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        UsersRecord user = authService.findByUsername(username);
        if(user == null) {
            log.error("User not found in database");
            throw new UsernameNotFoundException("User not found");
        } else {
            log.info("User found in the database: {}", username);
        }
        GrantedAuthority authority = new SimpleGrantedAuthority(user.getRole());
        return new User(user.getUsername(), user.getPassword(), List.of(authority));

    }
}
