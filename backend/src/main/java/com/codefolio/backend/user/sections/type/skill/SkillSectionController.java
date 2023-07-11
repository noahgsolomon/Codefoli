package com.codefolio.backend.user.sections.type.skill;

import com.codefolio.backend.util.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class SkillSectionController {

    private final SkillSectionService skillSectionService;

    public SkillSectionController(SkillSectionService skillSectionService){
        this.skillSectionService = skillSectionService;
    }

    @PutMapping("/skill/header-one")
    public ResponseEntity<Response> updateHeaderOne(Principal principal, @RequestBody String headerOne) {
        return skillSectionService.updateHeaderOne(principal, headerOne);
    }
}
