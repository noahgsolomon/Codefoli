package com.codefolio.backend.user.sections;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class SectionController {

    private final SectionService sectionService;

    public SectionController(SectionService sectionService) {
        this.sectionService = sectionService;
    }

    @DeleteMapping("/remove-section")
    public ResponseEntity<?> removeSection(Principal principal, @RequestBody RemoveSectionModel remove) {
        return sectionService.removeSection(principal, remove);
    }

}
