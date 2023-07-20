package com.codefolio.backend.user.sections.type.faq;

import com.codefolio.backend.util.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.security.Principal;

@Controller
public class FAQSectionController {

    private final FAQSectionService faqSectionService;

    public FAQSectionController(FAQSectionService faqSectionService) {
        this.faqSectionService = faqSectionService;
    }

    @PutMapping("/faq/header-one")
    public ResponseEntity<Response> updateHeaderOne(Principal principal, @RequestBody String headerOne) {
        return faqSectionService.updateHeaderOne(principal, headerOne);
    }

    @PutMapping("/faq/description-one")
    public ResponseEntity<Response> updateDescriptionOne(Principal principal, @RequestBody String descriptionOne) {
        return faqSectionService.updateDescriptionOne(principal, descriptionOne);
    }

}
