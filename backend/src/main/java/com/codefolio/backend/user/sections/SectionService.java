package com.codefolio.backend.user.sections;

import com.codefolio.backend.user.Users;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Optional;

import static com.codefolio.backend.user.UserService.getAuthenticatedUser;

@Service
@AllArgsConstructor
public class SectionService {

    SectionRepository sectionRepository;
    public ResponseEntity<?> removeSection(Principal principal, RemoveSectionModel remove) {
        Users user = getAuthenticatedUser(principal);
        Optional<Section> section = sectionRepository.findByUsersAndPageAndType(user, PageType.valueOf(remove.page()), SectionType.valueOf(remove.section()));
        if (section.isPresent()) {
            sectionRepository.delete(section.get());
            return ResponseEntity.ok("Section deleted");
        } else {
            return ResponseEntity.badRequest().body("Section not found");
        }
    }
}
