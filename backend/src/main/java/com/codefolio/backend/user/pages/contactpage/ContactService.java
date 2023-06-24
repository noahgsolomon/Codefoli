package com.codefolio.backend.user.pages.contactpage;

import com.codefolio.backend.user.Users;
import com.codefolio.backend.user.pages.contactpage.faq.FAQ;
import com.codefolio.backend.user.pages.contactpage.faq.FAQRepository;
import com.google.gson.Gson;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;

import static com.codefolio.backend.user.UserService.getAuthenticatedUser;

@Service
@AllArgsConstructor
public class ContactService {

    private final ContactRepository contactRepository;
    private final FAQRepository faqRepository;
    private final Gson gson;

    public ResponseEntity<?> getContact(Principal principal){
        Users users = getAuthenticatedUser(principal);
        Contact contact = contactRepository.findByUsers(users);
        List<FAQ> faqList = faqRepository.findAllByUsers(users);
        String jsonResponse = gson.toJson(new ContactModel(
                contact.getHeaderOne(),
                contact.getDescriptionOne(),
                contact.getEmail(),
                contact.getPhone(),
                contact.getHeaderTwo(),
                contact.getDescriptionTwo(),
                faqList));
        return ResponseEntity.ok(jsonResponse);
    }

}
