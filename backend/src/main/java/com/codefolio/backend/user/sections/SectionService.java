package com.codefolio.backend.user.sections;

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
public class SectionService {

    SectionRepository sectionRepository;

    public ResponseEntity<Response> removeSection(Principal principal, RemoveSectionModel remove) {
        try {
            Users user = getAuthenticatedUser(principal);
            Optional<Section> section = sectionRepository.findByUsersAndPageAndType(user, PageType.valueOf(remove.page()), SectionType.valueOf(remove.section()));
            if (section.isPresent()) {
                sectionRepository.delete(section.get());
                return ResponseEntity.ok(new Response(StatusType.OK, "Section deleted successfully", null));
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Response(StatusType.BAD, "Section not found", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }

}
