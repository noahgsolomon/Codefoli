package com.codefolio.backend.user.sections.type.value;

import com.codefolio.backend.util.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PutMapping("/value/update-value")
    public ResponseEntity<Response> updateValue(Principal principal, @RequestBody UpdateValueRequestModel updateValueRequestModel) {
        return valueSectionService.updateValue(principal, updateValueRequestModel);
    }

    @DeleteMapping("/value/remove-value")
    public ResponseEntity<Response> removeValue(Principal principal, @RequestBody String value) {
        return valueSectionService.removeValue(principal, value);
    }

    @PostMapping("/value/add-value")
    public ResponseEntity<Response> addValue(Principal principal, @RequestBody String value) {
        return valueSectionService.addValue(principal, value);
    }

}
