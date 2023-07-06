package com.codefolio.backend.authentication;

import com.codefolio.backend.util.Response;
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
    public ResponseEntity<Response> authenticate(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        return authenticateService.authenticate(loginRequest, response);
    }

    @PostMapping("/register")
    public ResponseEntity<Response> register(@RequestBody RegisterRequest registerRequest, HttpServletResponse response) {
        return authenticateService.register(registerRequest, response);
    }

    @GetMapping("/authenticated")
    public ResponseEntity<Response> authenticated(@CookieValue(value = "SESSION_ID", defaultValue = "") String sessionId) {
        return authenticateService.authenticated(sessionId);
    }
}
