package com.codefolio.backend.user.pages.aboutpage;

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
public class AboutService {
    private final AboutRepository aboutRepository;
    public ResponseEntity<Response> getAbout(Principal principal) {
        try {
            Users user = getAuthenticatedUser(principal);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new Response(StatusType.UNAUTHORIZED, "User not authenticated", null));
            }
            About aboutData = aboutRepository.findByUsers(user);
            if (aboutData == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response(StatusType.NOT_FOUND, "About data not found", null));
            }
            AboutModel aboutModel = new AboutModel(
                    aboutData.getHeaderOne(),
                    aboutData.getIconOne(),
                    aboutData.getIconTwo(),
                    aboutData.getHeaderTwo(),
                    aboutData.getIconThree(),
                    aboutData.getDescriptionOne());
            return ResponseEntity.ok(new Response(StatusType.OK, "About data fetched successfully", aboutModel));
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }

    public ResponseEntity<Response> updateHeaderOne(Principal principal, String headerOne) {
        try {
            Users user = getAuthenticatedUser(principal);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new Response(StatusType.UNAUTHORIZED, "User not authenticated", null));
            }
            About aboutData = aboutRepository.findByUsers(user);
            if (aboutData == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response(StatusType.NOT_FOUND, "About data not found", null));
            }
            aboutData.setHeaderOne(headerOne);
            aboutRepository.save(aboutData);
            return ResponseEntity.ok(new Response(StatusType.OK, "Header one updated successfully", headerOne));
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }

    public ResponseEntity<Response> updateHeaderTwo(Principal principal, String headerTwo) {
        try {
            Users user = getAuthenticatedUser(principal);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new Response(StatusType.UNAUTHORIZED, "User not authenticated", null));
            }
            About aboutData = aboutRepository.findByUsers(user);
            if (aboutData == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response(StatusType.NOT_FOUND, "About data not found", null));
            }
            aboutData.setHeaderTwo(headerTwo);
            aboutRepository.save(aboutData);
            return ResponseEntity.ok(new Response(StatusType.OK, "Header two updated successfully", headerTwo));
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }

    public ResponseEntity<Response> updateDescriptionOne(Principal principal, String descriptionOne) {
        try {
            Users user = getAuthenticatedUser(principal);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new Response(StatusType.UNAUTHORIZED, "User not authenticated", null));
            }
            About aboutData = aboutRepository.findByUsers(user);
            if (aboutData == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response(StatusType.NOT_FOUND, "About data not found", null));
            }
            aboutData.setDescriptionOne(descriptionOne);
            aboutRepository.save(aboutData);
            return ResponseEntity.ok(new Response(StatusType.OK, "Description one updated successfully", descriptionOne));
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }

}
