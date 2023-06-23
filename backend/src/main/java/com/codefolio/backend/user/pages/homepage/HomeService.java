package com.codefolio.backend.user.pages.homepage;

import com.codefolio.backend.user.Users;
import com.google.gson.Gson;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.security.Principal;

import static com.codefolio.backend.user.UserService.getAuthenticatedUser;

@Service
@AllArgsConstructor
public class HomeService {
    private final HomeRepository homeRepository;
    private final Gson gson;
    public ResponseEntity<?> getHome(Principal principal) {
        System.out.println("hi");
        Users user = getAuthenticatedUser(principal);
        System.out.println(user);
        Home homeData = homeRepository.findByUsers(user);
        String jsonResponse = gson.toJson(homeData);
        return ResponseEntity.ok(jsonResponse);
    }
}
