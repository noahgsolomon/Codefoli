package com.codefolio.backend.user.faq;

import com.codefolio.backend.user.Users;
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
public class FAQService {

    private final FAQRepository faqRepository;


    public ResponseEntity<Response> updateTitle(Principal principal, FAQUpdateTitleRequestModel request) {
        try{
            Users user = getAuthenticatedUser(principal);
            Long id = Long.parseLong(request.id());
            Optional<FAQ> optionalFaq = faqRepository.findByUsersAndId(user, id);
            if (optionalFaq.isPresent()) {
                FAQ faq = optionalFaq.get();
                faq.setQuestion(request.title());
                faqRepository.save(faq);
                return ResponseEntity.ok(new Response(StatusType.OK, "FAQ title updated successfully", faq.getQuestion()));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response(StatusType.NOT_FOUND, "No FAQ found with the provided id", null));
            }
        } catch (NumberFormatException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Response(StatusType.ERROR, "Invalid id format", null));
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }

    public ResponseEntity<Response> updateContent(Principal principal, FAQUpdateContentRequestModel request) {
        try{
            Users user = getAuthenticatedUser(principal);
            Long id = Long.parseLong(request.id());
            Optional<FAQ> optionalFaq = faqRepository.findByUsersAndId(user, id);
            if (optionalFaq.isPresent()) {
                FAQ faq = optionalFaq.get();
                faq.setAnswer(request.content());
                faqRepository.save(faq);
                return ResponseEntity.ok(new Response(StatusType.OK, "FAQ content updated successfully", faq.getAnswer()));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response(StatusType.NOT_FOUND, "No FAQ found with the provided id", null));
            }
        } catch (NumberFormatException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Response(StatusType.ERROR, "Invalid id format", null));
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }

    public ResponseEntity<Response> removeFAQ(Principal principal, String id) {
        try{
            Users user = getAuthenticatedUser(principal);
            Long faqId = Long.parseLong(id);
            Optional<FAQ> optionalFaq = faqRepository.findByUsersAndId(user, faqId);
            if (optionalFaq.isPresent()) {
                FAQ faq = optionalFaq.get();
                faqRepository.delete(faq);
                return ResponseEntity.ok(new Response(StatusType.OK, "FAQ removed successfully", null));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response(StatusType.NOT_FOUND, "No FAQ found with the provided id", null));
            }
        } catch (NumberFormatException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Response(StatusType.ERROR, "Invalid id format", null));
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }

    public ResponseEntity<Response> addFAQ(Principal principal, FAQAddRequestModel request) {
        try{
            Users user = getAuthenticatedUser(principal);
            FAQ faq = new FAQ(user, request.title(), request.content());
            faqRepository.save(faq);
            FAQAddResponseModel response = new FAQAddResponseModel(faq.getId().toString(), faq.getQuestion(), faq.getAnswer());
            return ResponseEntity.ok(new Response(StatusType.OK, "FAQ added successfully", response));
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }
}
