package com.codefolio.backend.user.pages.contactpage;

import com.codefolio.backend.user.Users;
import com.codefolio.backend.user.sections.PageType;
import com.codefolio.backend.util.PageSections;
import com.codefolio.backend.util.Response;
import com.codefolio.backend.util.StatusType;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;

import static com.codefolio.backend.user.UserService.getAuthenticatedUser;

@Service
@AllArgsConstructor
public class ContactService {

    private final ContactRepository contactRepository;
    private final PageSections pageSections;

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

            List<Object> sectionDetails = pageSections.getSections(users, PageType.CONTACT);

            ContactModel contactModel = new ContactModel(
                    contact.getHeaderOne(),
                    contact.getDescriptionOne(),
                    sectionDetails
                    );

            return ResponseEntity.ok(new Response(StatusType.OK, "Contact data fetched successfully", contactModel));

        } catch (Exception e) {
            e.printStackTrace();
            System.err.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }

    public ResponseEntity<Response> updateHeaderOne(Principal principal, String headerOne) {
        try {
            Users user = getAuthenticatedUser(principal);
            Contact contactData = contactRepository.findByUsers(user);
            if (contactData == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response(StatusType.NOT_FOUND, "Contact data not found", null));
            }
            contactData.setHeaderOne(headerOne);
            contactRepository.save(contactData);
            return ResponseEntity.ok(new Response(StatusType.OK, "Header one updated successfully", headerOne));
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }

    public ResponseEntity<Response> updateDescriptionOne(Principal principal, String descriptionOne) {
        try {
            Users user = getAuthenticatedUser(principal);
            Contact contactData = contactRepository.findByUsers(user);
            if (contactData == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response(StatusType.NOT_FOUND, "Contact data not found", null));
            }
            contactData.setDescriptionOne(descriptionOne);
            contactRepository.save(contactData);
            return ResponseEntity.ok(new Response(StatusType.OK, "Description one updated successfully", descriptionOne));
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }
}
