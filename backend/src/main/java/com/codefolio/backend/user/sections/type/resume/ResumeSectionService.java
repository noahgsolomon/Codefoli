package com.codefolio.backend.user.sections.type.resume;

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
public class ResumeSectionService {

    private final ResumeSectionRepository resumeSectionRepository;

    public ResponseEntity<Response> updateHeaderOne(Principal principal, String headerOne) {
        try {
            Users user = getAuthenticatedUser(principal);
            Optional<ResumeSection> optionalResumeData = resumeSectionRepository.findByUsers(user);
            if (optionalResumeData.isPresent()) {
                ResumeSection resumeData = optionalResumeData.get();
                resumeData.setHeaderOne(headerOne);
                resumeSectionRepository.save(resumeData);
                return ResponseEntity.ok(new Response(StatusType.OK, "Header one updated successfully", resumeData.getHeaderOne()));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response(StatusType.NOT_FOUND, "No resume section data found", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }
}
