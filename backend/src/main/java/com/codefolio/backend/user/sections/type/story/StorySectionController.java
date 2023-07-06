package com.codefolio.backend.user.sections.type.story;

import com.codefolio.backend.util.Response;
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
    public ResponseEntity<Response> updateHeaderOne(Principal principal, @RequestBody String headerOne) {
        return storySectionService.updateHeaderOne(principal, headerOne);
    }
    @PutMapping("/story/description-one")
    public ResponseEntity<Response> updateDescriptionOne(Principal principal, @RequestBody String descriptionOne) {
        return storySectionService.updateDescriptionOne(principal, descriptionOne);
    }

    @PutMapping("/story/bullet-one")
    public ResponseEntity<Response> updateBulletOne(Principal principal, @RequestBody String bulletOne) {
        return storySectionService.updateBulletOne(principal, bulletOne);
    }
    @PutMapping("/story/bullet-two")
    public ResponseEntity<Response> updateBulletTwo(Principal principal, @RequestBody String bulletTwo) {
        return storySectionService.updateBulletTwo(principal, bulletTwo);
    }

    @PutMapping("/story/bullet-three")
    public ResponseEntity<Response> updateBulletThree(Principal principal, @RequestBody String bulletThree) {
        return storySectionService.updateBulletThree(principal, bulletThree);
    }



}
