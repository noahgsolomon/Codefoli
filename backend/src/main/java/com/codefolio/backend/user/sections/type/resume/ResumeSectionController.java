package com.codefolio.backend.user.sections.type.resume;

import com.codefolio.backend.util.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class ResumeSectionController {

    private final ResumeSectionService resumeSectionService;

    public ResumeSectionController(ResumeSectionService resumeSectionService){
        this.resumeSectionService = resumeSectionService;
    }

    @PutMapping("/resume/header-one")
    public ResponseEntity<Response> updateHeaderOne(Principal principal, @RequestBody String headerOne) {
        return resumeSectionService.updateHeaderOne(principal, headerOne);
    }

}
