package com.codefolio.backend.authentication;

import com.codefolio.backend.user.UserRepository;
import com.codefolio.backend.user.Users;
import com.codefolio.backend.user.session.UserSession;
import com.codefolio.backend.user.session.UserSessionRepository;
import com.codefolio.backend.util.Response;
import com.codefolio.backend.util.StatusType;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.context.request.RequestContextHolder;

import java.util.Date;
import java.util.Optional;
import java.util.regex.Pattern;

@Service
@AllArgsConstructor
public class AuthenticateService {

    private AuthenticationManager authenticationManager;
    private UserSessionRepository userSessionRepository;
    private UserRepository userRepository;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public ResponseEntity<Response> authenticate(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        try {
            Optional<Users> user = userRepository.findByEmail(loginRequest.email());
            if(user.isPresent() && passwordEncoder.matches(loginRequest.password(), user.get().getPassword())) {
                Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.email(), loginRequest.password()));
                SecurityContextHolder.getContext().setAuthentication(authentication);
                String sessionId = RequestContextHolder.currentRequestAttributes().getSessionId();
                Cookie cookie = new Cookie("SESSION_ID", sessionId);
                cookie.setPath("/");
                cookie.setSecure(true);
                cookie.setHttpOnly(true);
                response.addCookie(cookie);

                UserSession userSession = new UserSession(sessionId, user.get(), new Date());
                userSessionRepository.save(userSession);

                return ResponseEntity.ok(new Response(StatusType.OK, "Logged in successfully", null));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new Response(StatusType.BAD, "Invalid credentials", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }

    public ResponseEntity<Response> register(@RequestBody RegisterRequest registerRequest, HttpServletResponse response) {
        try {
            if (registerRequest.email() == null || registerRequest.password() == null || registerRequest.name() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Response(StatusType.BAD, "Please fill out all fields", null));
            }
            Optional<Users> user = userRepository.findByEmail(registerRequest.email());
            if(user.isPresent()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Response(StatusType.BAD, "User already exists", null));
            } else {
                if (registerRequest.password().length() < 6) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Response(StatusType.BAD, "Password must be at least 6 characters long", null));
                }
                if (!isValidEmail(registerRequest.email())){
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Response(StatusType.BAD, "Invalid email", null));
                }
                Users newUser = new Users(registerRequest.name(), registerRequest.email(), passwordEncoder.encode(registerRequest.password()));
                userRepository.save(newUser);
                Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(registerRequest.email(), registerRequest.password()));

                SecurityContextHolder.getContext().setAuthentication(authentication);
                String sessionId = RequestContextHolder.currentRequestAttributes().getSessionId();
                Cookie cookie = new Cookie("SESSION_ID", sessionId);
                cookie.setPath("/");
                cookie.setSecure(true);
                cookie.setHttpOnly(true);
                response.addCookie(cookie);

                UserSession userSession = new UserSession(sessionId, newUser, new Date());
                userSessionRepository.save(userSession);

                return ResponseEntity.ok(new Response(StatusType.OK, "Registered successfully", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }

    public ResponseEntity<Response> authenticated(@CookieValue(value = "SESSION_ID", defaultValue = "") String sessionId) {
        try {
            Optional<UserSession> userSession = userSessionRepository.findBySessionId(sessionId);
            if (userSession.isPresent()) {
                return ResponseEntity.ok(new Response(StatusType.OK, "Authenticated successfully", null));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new Response(StatusType.UNAUTHORIZED, "Not authenticated", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }


    public static boolean isValidEmail(String email) {
        String emailRegex = "^[A-Za-z0-9+_.-]+@(.+)$";

        Pattern pat = Pattern.compile(emailRegex);
        if (email == null) {
            return false;
        }
        return pat.matcher(email).matches();
    }

}
