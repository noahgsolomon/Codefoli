package com.codefolio.backend.user;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class UserController {

    UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user")
    public ResponseEntity<?> userDetails(Principal principal){
        return userService.userDetails(principal);
    }

    @PostMapping("/setup")
    public ResponseEntity<?> setup(@RequestBody UserProfileRequestModel userProfile, Principal principal){
        return userService.setup(userProfile, principal);
    }
}
