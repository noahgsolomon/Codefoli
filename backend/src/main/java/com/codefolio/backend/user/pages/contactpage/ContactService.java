package com.codefolio.backend.user.pages.contactpage;

import com.codefolio.backend.user.Users;
import com.codefolio.backend.util.Response;
import com.codefolio.backend.util.StatusType;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.security.Principal;

import static com.codefolio.backend.user.UserService.getAuthenticatedUser;

@Service
@AllArgsConstructor
public class ContactService {

    private final ContactRepository contactRepository;

    public ResponseEntity<Response> getContact(Principal principal) {
        try {
            Users users = getAuthenticatedUser(principal);
            if (users == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new Response(StatusType.UNAUTHORIZED, "User not authenticated", null));
            }

            Contact contact = contactRepository.findByUsers(users);
            if (contact == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new Response(StatusType.NOT_FOUND, "Contact data not found", null));
            }

            ContactModel contactModel = new ContactModel(
                    contact.getHeaderOne(),
                    contact.getDescriptionOne(),
                    contact.getEmail(),
                    contact.getPhone());

            return ResponseEntity.ok(new Response(StatusType.OK, "Contact data fetched successfully", contactModel));

        } catch (Exception e) {
            e.printStackTrace();
            System.err.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }
}
