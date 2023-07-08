package com.codefolio.backend.user.sections;

import com.codefolio.backend.util.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
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
    public ResponseEntity<Response> removeSection(Principal principal, @RequestBody SectionModelRequest remove) {
        return sectionService.removeSection(principal, remove);
    }

    @PostMapping("/add-section")
    public ResponseEntity<Response> addSection(Principal principal, @RequestBody SectionModelRequest add) {
        return sectionService.addSection(principal, add);
    }

}
