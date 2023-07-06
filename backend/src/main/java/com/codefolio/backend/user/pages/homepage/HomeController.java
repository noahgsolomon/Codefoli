package com.codefolio.backend.user.pages.homepage;

import com.codefolio.backend.util.Response;
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
    public ResponseEntity<Response> getHome(Principal principal) {
        return homeService.getHome(principal);
    }

    @PutMapping("/home/headerOne")
    public ResponseEntity<Response> updateHeaderOne(Principal principal, @RequestBody String headerOne) {
        return homeService.updateHeaderOne(principal, headerOne);
    }

    @PutMapping("/home/descriptionOne")
    public ResponseEntity<Response> updateDescriptionOne(Principal principal, @RequestBody String descriptionOne) {
        return homeService.updateDescriptionOne(principal, descriptionOne);
    }
}
