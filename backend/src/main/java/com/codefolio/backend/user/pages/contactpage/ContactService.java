package com.codefolio.backend.user.pages.contactpage;

import com.codefolio.backend.user.Users;
import com.google.gson.Gson;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.security.Principal;

import static com.codefolio.backend.user.UserService.getAuthenticatedUser;

@Service
@AllArgsConstructor
public class ContactService {

    private final ContactRepository contactRepository;
    private final Gson gson;

    public ResponseEntity<?> getContact(Principal principal){
        Users users = getAuthenticatedUser(principal);
        Contact contact = contactRepository.findByUsers(users);
        String jsonResponse = gson.toJson(new ContactModel(
                contact.getHeaderOne(),
                contact.getDescriptionOne(),
                contact.getEmail(),
                contact.getPhone()));
        return ResponseEntity.ok(jsonResponse);
    }

}
