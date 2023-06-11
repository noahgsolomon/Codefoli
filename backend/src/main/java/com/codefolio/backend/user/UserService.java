package com.codefolio.backend.user;

import com.google.gson.Gson;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserSessionRepository userSessionRepository;

    public ResponseEntity<?> userDetails(Principal principal) {
        if (principal instanceof Authentication) {
            Object principalUser = ((Authentication) principal).getPrincipal();
            if (principalUser instanceof Users user) {
                Gson gson = new Gson();
                return ResponseEntity.ok(gson.toJson(user));
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
    }
}
