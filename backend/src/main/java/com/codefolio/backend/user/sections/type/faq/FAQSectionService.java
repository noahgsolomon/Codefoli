package com.codefolio.backend.user.sections.type.faq;

import com.codefolio.backend.user.Users;
import com.codefolio.backend.user.pages.contactpage.faq.FAQRepository;
import com.codefolio.backend.util.Response;
import com.codefolio.backend.util.StatusType;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Optional;

import static com.codefolio.backend.user.UserService.getAuthenticatedUser;

@Service
@AllArgsConstructor
public class FAQSectionService {

    private final FAQSectionRepository faqSectionRepository;
    private final FAQRepository faqRepository;


    public ResponseEntity<Response> updateHeaderOne(Principal principal, String headerOne) {
        try {
            Users user = getAuthenticatedUser(principal);
            Optional<FAQSection> optionalFaqData = faqSectionRepository.findByUsers(user);
            if (optionalFaqData.isPresent()) {
                FAQSection faqData = optionalFaqData.get();
                faqData.setHeaderOne(headerOne);
                faqSectionRepository.save(faqData);
                return ResponseEntity.ok(new Response(StatusType.OK, "Header one updated successfully", faqData.getHeaderOne()));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response(StatusType.NOT_FOUND, "No faq section data found", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }

    public ResponseEntity<Response> updateDescriptionOne(Principal principal, String descriptionOne) {
        try{
            Users user = getAuthenticatedUser(principal);
            Optional<FAQSection> optionalFaqData = faqSectionRepository.findByUsers(user);
            if (optionalFaqData.isPresent()) {
                FAQSection faqData = optionalFaqData.get();
                faqData.setDescriptionOne(descriptionOne);
                faqSectionRepository.save(faqData);
                return ResponseEntity.ok(new Response(StatusType.OK, "Description one updated successfully", faqData.getDescriptionOne()));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response(StatusType.NOT_FOUND, "No faq section data found", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }
}
