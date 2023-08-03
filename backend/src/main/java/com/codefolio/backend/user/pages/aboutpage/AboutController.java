package com.codefolio.backend.user.pages.aboutpage;

import com.codefolio.backend.util.Response;
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
    public ResponseEntity<Response> getAbout(Principal principal) {
        return aboutService.getAbout(principal);
    }

    @PutMapping("/about/header-one")
    public ResponseEntity<Response> updateHeaderOne(Principal principal, @RequestBody String headerOne) {
        return aboutService.updateHeaderOne(principal, headerOne);
    }

    @PutMapping("/about/header-two")
    public ResponseEntity<Response> updateHeaderTwo(Principal principal, @RequestBody String headerTwo) {
        return aboutService.updateHeaderTwo(principal, headerTwo);
    }

    @PutMapping("/about/description-one")
    public ResponseEntity<Response> updateDescriptionOne(Principal principal, @RequestBody String descriptionOne) {
        return aboutService.updateDescriptionOne(principal, descriptionOne);
    }

    @PutMapping("/about/description-two")
    public ResponseEntity<Response> updateDescriptionTwo(Principal principal, @RequestBody String descriptionTwo) {
        return aboutService.updateDescriptionTwo(principal, descriptionTwo);
    }

}
