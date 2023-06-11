package com.codefolio.backend.authentication;
import com.codefolio.backend.user.UserRepository;
import com.codefolio.backend.user.UserSession;
import com.codefolio.backend.user.UserSessionRepository;
import com.codefolio.backend.user.Users;
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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import java.util.Date;
import java.util.Optional;
import java.util.regex.Pattern;

@RestController
@AllArgsConstructor
public class AuthenticateController {

    private AuthenticationManager authenticationManager;
    private UserSessionRepository userSessionRepository;
    private UserRepository userRepository;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {

        Optional<Users> user = userRepository.findByEmail(loginRequest.email());
        System.out.println(user);
        if(user.isPresent() && passwordEncoder.matches(loginRequest.password(), user.get().getPassword())) {
            System.out.println("HI email!");
                Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.email(), loginRequest.password()));
                SecurityContextHolder.getContext().setAuthentication(authentication);
                String sessionId = RequestContextHolder.currentRequestAttributes().getSessionId();
            System.out.println(sessionId);
                Cookie cookie = new Cookie("SESSION_ID", sessionId);
                cookie.setPath("/");
                cookie.setSecure(true);
                cookie.setHttpOnly(true);
                response.addCookie(cookie);

                UserSession userSession = new UserSession(sessionId, user.get(), new Date());
                userSessionRepository.save(userSession);
            System.out.println(userSession);
                System.out.println("User session saved: " + userSession.getId());

                return ResponseEntity.ok("Logged in successfully");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest, HttpServletResponse response) {
        if (registerRequest.email() == null || registerRequest.password() == null || registerRequest.name() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please fill out all fields");
        }
        Optional<Users> user = userRepository.findByEmail(registerRequest.email());
        if(user.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User already exists");
        } else {
            if (registerRequest.password().length() < 6) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Password must be at least 6 characters long");
            }
            if (!isValidEmail(registerRequest.email())){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid email");
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

            return ResponseEntity.ok("Registered successfully");
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
