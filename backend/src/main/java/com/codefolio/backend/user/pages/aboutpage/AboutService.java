package com.codefolio.backend.user.pages.aboutpage;

import com.codefolio.backend.user.Users;
import com.codefolio.backend.user.pages.aboutpage.values.Values;
import com.codefolio.backend.user.pages.aboutpage.values.ValuesRepository;
import com.google.gson.Gson;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;

import static com.codefolio.backend.user.UserService.getAuthenticatedUser;

@Service
@AllArgsConstructor
public class AboutService {
    private final AboutRepository aboutRepository;
    private final ValuesRepository valuesRepository;
    private final Gson gson;
    public ResponseEntity<?> getAbout(Principal principal) {
        Users user = getAuthenticatedUser(principal);
        About aboutData = aboutRepository.findByUsers(user);
        List<Values> values = valuesRepository.findAllByUsers(user);
        AboutModel aboutModel = new AboutModel(
                aboutData.getHeaderOne(),
                aboutData.getIconOne(),
                aboutData.getIconTwo(),
                aboutData.getHeaderTwo(),
                aboutData.getIconThree(),
                aboutData.getDescriptionOne(),
                aboutData.getHeaderThree(),
                aboutData.getDescriptionTwo(),
                aboutData.getBulletOne(),
                aboutData.getBulletTwo(),
                aboutData.getBulletThree(),
                aboutData.getImageOne(),
                aboutData.getHeaderFour(),
                aboutData.getHeaderFive(),
                aboutData.getDescriptionThree()
                , values);
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
}
