package com.codefolio.backend.user.pages.aboutpage;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
public class AboutController {

    private final AboutService aboutService;

    public AboutController(AboutService aboutService) {
        this.aboutService = aboutService;
    }
    @GetMapping("/about")
    public ResponseEntity<?> getAbout(Principal principal) {
        return aboutService.getAbout(principal);
    }

    @PutMapping("/about/header-one")
    public ResponseEntity<?> updateHeaderOne(Principal principal, @RequestBody String headerOne) {
        return aboutService.updateHeaderOne(principal, headerOne);
    }

    @PutMapping("/about/header-two")
    public ResponseEntity<?> updateHeaderTwo(Principal principal, @RequestBody String headerTwo) {
        return aboutService.updateHeaderTwo(principal, headerTwo);
    }

    @PutMapping("/about/description-one")
    public ResponseEntity<?> updateDescriptionOne(Principal principal, @RequestBody String descriptionOne) {
        return aboutService.updateDescriptionOne(principal, descriptionOne);
    }

    @PutMapping("/about/change-section-two")
    public ResponseEntity<?> removeSectionTwo(Principal principal, @RequestBody String active) {
        return aboutService.changeSectionTwo(principal, active);
    }

    @PutMapping("/about/header-three")
    public ResponseEntity<?> updateHeaderThree(Principal principal, @RequestBody String headerThree) {
        return aboutService.updateHeaderThree(principal, headerThree);
    }
}
