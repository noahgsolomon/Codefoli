package com.codefolio.backend.user.sections.type.story;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class StorySectionController {

    private final StorySectionService storySectionService;

    public StorySectionController(StorySectionService storySectionService){
        this.storySectionService = storySectionService;
    }

    @PutMapping("/story/header-one")
    public ResponseEntity<?> updateHeaderOne(Principal principal, @RequestBody String headerOne) {
        return storySectionService.updateHeaderOne(principal, headerOne);
    }
    @PutMapping("/story/description-one")
    public ResponseEntity<?> updateDescriptionOne(Principal principal, @RequestBody String descriptionOne) {
        return storySectionService.updateDescriptionOne(principal, descriptionOne);
    }



}
