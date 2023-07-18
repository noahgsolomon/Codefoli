package com.codefolio.backend.user.sections.type.value;

import com.codefolio.backend.util.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class ValueSectionController {

    private final ValueSectionService valueSectionService;

    public ValueSectionController(ValueSectionService valueSectionService){
        this.valueSectionService = valueSectionService;
    }

    @PutMapping("/value/header-one")
    public ResponseEntity<Response> updateHeaderOne(Principal principal, @RequestBody String headerOne) {
        return valueSectionService.updateHeaderOne(principal, headerOne);
    }

    @PutMapping("/value/description-one")
    public ResponseEntity<Response> updateDescriptionOne(Principal principal, @RequestBody String descriptionOne) {
        return valueSectionService.updateDescriptionOne(principal, descriptionOne);
    }

}
