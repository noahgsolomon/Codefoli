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
        Users user = getAuthenticatedUser(principal);
        Home homeData = homeRepository.findByUsers(user);
        String jsonResponse = gson.toJson(homeData);
        return ResponseEntity.ok(jsonResponse);
    }

    public ResponseEntity<?> updateHeaderOne(Principal principal, String headerOne) {
        Users user = getAuthenticatedUser(principal);
        Home homeData = homeRepository.findByUsers(user);
        homeData.setHeaderOne(headerOne);
        homeRepository.save(homeData);
        return ResponseEntity.ok(homeData.getHeaderOne());
    }
}
