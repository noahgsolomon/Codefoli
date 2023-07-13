package com.codefolio.backend.user.sections.type.skill;

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
public class SkillSectionService {

    private final SkillSectionRepository skillSectionRepository;

    public ResponseEntity<Response> updateHeaderOne(Principal principal, String headerOne) {
        try {
            Users user = getAuthenticatedUser(principal);
            Optional<SkillSection> optionalSkillData = skillSectionRepository.findByUsers(user);
            if (optionalSkillData.isPresent()) {
                SkillSection skillData = optionalSkillData.get();
                skillData.setHeaderOne(headerOne);
                skillSectionRepository.save(skillData);
                return ResponseEntity.ok(new Response(StatusType.OK, "Header one updated successfully", skillData.getHeaderOne()));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response(StatusType.NOT_FOUND, "No skill section data found", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }

}
