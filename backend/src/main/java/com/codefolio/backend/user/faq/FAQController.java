package com.codefolio.backend.user.faq;

import com.codefolio.backend.util.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
public class FAQController {

    private final FAQService faqService;

    public FAQController(FAQService faqService) {
        this.faqService = faqService;
    }

    @PutMapping("/faq/title")
    public ResponseEntity<Response> updateTitle(Principal principal, @RequestBody FAQUpdateTitleRequestModel request) {
        return faqService.updateTitle(principal, request);
    }

    @PutMapping("/faq/content")
    public ResponseEntity<Response> updateContent(Principal principal, @RequestBody FAQUpdateContentRequestModel request) {
        return faqService.updateContent(principal, request);
    }

    @DeleteMapping("/faq/remove-faq")
    public ResponseEntity<Response> removeFAQ(Principal principal, @RequestBody String id) {
        return faqService.removeFAQ(principal, id);
    }

    @PostMapping("/faq/add-faq")
    public ResponseEntity<Response> addFAQ(Principal principal, @RequestBody FAQAddRequestModel request) {
        return faqService.addFAQ(principal, request);
    }
}
