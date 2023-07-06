package com.codefolio.backend.authentication;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthenticateController {

    private final AuthenticateService authenticateService;

    public AuthenticateController(AuthenticateService authenticateService) {
        this.authenticateService = authenticateService;
    }


    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        return authenticateService.authenticate(loginRequest, response);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest, HttpServletResponse response) {
        return authenticateService.register(registerRequest, response);
    }

    @GetMapping("/authenticated")
    public ResponseEntity<?> authenticated(@CookieValue(value = "SESSION_ID", defaultValue = "") String sessionId) {
        return authenticateService.authenticated(sessionId);
    }
}
