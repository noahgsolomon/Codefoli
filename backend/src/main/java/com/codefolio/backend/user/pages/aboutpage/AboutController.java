package com.codefolio.backend.user.pages.aboutpage;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
