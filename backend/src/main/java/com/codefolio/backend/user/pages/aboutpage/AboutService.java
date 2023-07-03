package com.codefolio.backend.user.pages.aboutpage;

import com.codefolio.backend.user.Users;
import com.google.gson.Gson;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.security.Principal;

import static com.codefolio.backend.user.UserService.getAuthenticatedUser;

@Service
@AllArgsConstructor
public class AboutService {
    private final AboutRepository aboutRepository;
    private final Gson gson;
    public ResponseEntity<?> getAbout(Principal principal) {
        Users user = getAuthenticatedUser(principal);
        About aboutData = aboutRepository.findByUsers(user);
        AboutModel aboutModel = new AboutModel(
                aboutData.getHeaderOne(),
                aboutData.getIconOne(),
                aboutData.getIconTwo(),
                aboutData.getHeaderTwo(),
                aboutData.getIconThree(),
                aboutData.getDescriptionOne());
        String jsonResponse = gson.toJson(aboutModel);
        return ResponseEntity.ok(jsonResponse);
    }
    public ResponseEntity<?> updateHeaderOne(Principal principal, String headerOne) {
        Users user = getAuthenticatedUser(principal);
        About aboutData = aboutRepository.findByUsers(user);
        aboutData.setHeaderOne(headerOne);
        aboutRepository.save(aboutData);
        return ResponseEntity.ok(aboutData.getHeaderOne());
    }

    public ResponseEntity<?> updateHeaderTwo(Principal principal, String headerTwo) {
        Users user = getAuthenticatedUser(principal);
        About aboutData = aboutRepository.findByUsers(user);
        aboutData.setHeaderTwo(headerTwo);
        aboutRepository.save(aboutData);
        return ResponseEntity.ok(aboutData.getHeaderTwo());
    }

    public ResponseEntity<?> updateDescriptionOne(Principal principal, String descriptionOne) {
        Users user = getAuthenticatedUser(principal);
        About aboutData = aboutRepository.findByUsers(user);
        aboutData.setDescriptionOne(descriptionOne);
        aboutRepository.save(aboutData);
        return ResponseEntity.ok(aboutData.getDescriptionOne());
    }

}
