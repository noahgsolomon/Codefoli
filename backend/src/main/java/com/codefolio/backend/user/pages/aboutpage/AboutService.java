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
                aboutData.getDescriptionThree(),
                aboutData.isSectionTwoActive(),
                values);
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

    public ResponseEntity<?> updateDescriptionTwo(Principal principal, String descriptionTwo) {
        Users user = getAuthenticatedUser(principal);
        About aboutData = aboutRepository.findByUsers(user);
        aboutData.setDescriptionTwo(descriptionTwo);
        aboutRepository.save(aboutData);
        return ResponseEntity.ok(aboutData.getDescriptionTwo());
    }


    public ResponseEntity<?> changeSectionTwo(Principal principal, String active) {
        Users user = getAuthenticatedUser(principal);
        About aboutData = aboutRepository.findByUsers(user);
        if (active.equals("true")){
            aboutData.setHeaderTwo("Designing since I was ? years old");
            aboutData.setDescriptionTwo("I started designing when I was ? years old. My first designs were for my school projects. I was fascinated by the idea of creating something that people can interact with. I studied design for 5 years in college and have been working as a designer for 3 years.");
            aboutData.setImageOne("https://assets.website-files.com/63360c0c2b86f80ba8b5421a/633b55bcb4baec57b75b66fd_desigining-experience-paperfolio-webflow-template.png");
            aboutData.setBulletOne("Passionate about design from a young age.");
            aboutData.setBulletTwo("Five years of design education, three professionally.");
            aboutData.setBulletThree("Strong advocate of user-centered design.");
            aboutData.setSectionTwoActive(false);
        }
        else {
            aboutData.setSectionTwoActive(true);
        }

        aboutRepository.save(aboutData);
        return ResponseEntity.ok(aboutData.getDescriptionOne());
    }

    public ResponseEntity<?> updateHeaderThree(Principal principal, String headerThree) {
        Users user = getAuthenticatedUser(principal);
        About aboutData = aboutRepository.findByUsers(user);
        aboutData.setHeaderThree(headerThree);
        aboutRepository.save(aboutData);
        return ResponseEntity.ok(aboutData.getHeaderThree());
    }


}
