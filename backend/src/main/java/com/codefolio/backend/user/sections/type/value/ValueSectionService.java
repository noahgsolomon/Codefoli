package com.codefolio.backend.user.sections.type.value;

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
public class ValueSectionService {

    private final ValueSectionRepository valueSectionRepository;

    public ResponseEntity<Response> updateHeaderOne(Principal principal, String headerOne) {
        try {
            Users user = getAuthenticatedUser(principal);
            Optional<ValueSection> optionalValueData = valueSectionRepository.findByUsers(user);
            if (optionalValueData.isPresent()) {
                ValueSection valueData = optionalValueData.get();
                valueData.setHeaderOne(headerOne);
                valueSectionRepository.save(valueData);
                return ResponseEntity.ok(new Response(StatusType.OK, "Header one updated successfully", valueData.getHeaderOne()));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response(StatusType.NOT_FOUND, "No value section data found", null));
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
            Optional<ValueSection> optionalValueData = valueSectionRepository.findByUsers(user);
            if (optionalValueData.isPresent()) {
                ValueSection valueData = optionalValueData.get();
                valueData.setDescriptionOne(descriptionOne);
                valueSectionRepository.save(valueData);
                return ResponseEntity.ok(new Response(StatusType.OK, "Description one updated successfully", valueData.getDescriptionOne()));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response(StatusType.NOT_FOUND, "No value section data found", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }
}
