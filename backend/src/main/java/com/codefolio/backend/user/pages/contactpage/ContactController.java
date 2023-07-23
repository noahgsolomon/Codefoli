package com.codefolio.backend.user.pages.contactpage;

import com.codefolio.backend.util.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @GetMapping("/contact")
    public ResponseEntity<Response> getContact(Principal principal){
        return contactService.getContact(principal);
    }

    @PutMapping("/contact/header-one")
    public ResponseEntity<Response> updateHeaderOne(Principal principal, @RequestBody String headerOne) {
        return contactService.updateHeaderOne(principal, headerOne);
    }
    @PutMapping("/contact/description-one")
    public ResponseEntity<Response> updateDescriptionOne(Principal principal, @RequestBody String descriptionOne) {
        return contactService.updateDescriptionOne(principal, descriptionOne);
    }

    @PutMapping("/contact/email")
    public ResponseEntity<Response> updateEmail(Principal principal, @RequestBody String email) {
        return contactService.updateEmail(principal, email);
    }

    @PutMapping("/contact/phone")
    public ResponseEntity<Response> updatePhone(Principal principal, @RequestBody String phone) {
        return contactService.updatePhone(principal, phone);
    }
}
