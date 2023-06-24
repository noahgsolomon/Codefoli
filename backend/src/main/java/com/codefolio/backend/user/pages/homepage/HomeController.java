package com.codefolio.backend.user.pages.homepage;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
public class HomeController {

    private final HomeService homeService;

    public HomeController(HomeService homeService) {
        this.homeService = homeService;
    }

    @GetMapping("/home")
    public ResponseEntity<?> getHome(Principal principal) {
        return homeService.getHome(principal);
    }

    @PutMapping("/home/headerOne")
    public ResponseEntity<?> updateHeaderOne(Principal principal, @RequestBody String headerOne) {
        return homeService.updateHeaderOne(principal, headerOne);
    }
}
