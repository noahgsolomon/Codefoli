package com.codefolio.backend.user.pages.homepage;

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
public class HomeService {
    private final HomeRepository homeRepository;
    private final PageSections pageSections;
    public ResponseEntity<Response> getHome(Principal principal) {
        try {
            Users user = getAuthenticatedUser(principal);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new Response(StatusType.UNAUTHORIZED, "Unauthorized", null));
            }

            Home homeData = homeRepository.findByUsers(user);
            if (homeData == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new Response(StatusType.NOT_FOUND, "Home data not found", null));
            }

            List<Object> sectionDetails = pageSections.getSections(user, PageType.HOME);

            return ResponseEntity.ok(new Response(StatusType.OK, "Success",
                    new HomeResponseModel(homeData.getHeaderOne(), homeData.getDescriptionOne(), homeData.getHeaderTwo(), homeData.getProfileImage(), sectionDetails)));

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
            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new Response(StatusType.UNAUTHORIZED, "Unauthorized", null));
            }

            Home homeData = homeRepository.findByUsers(user);
            if (homeData == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new Response(StatusType.NOT_FOUND, "Home data not found", null));
            }

            homeData.setHeaderOne(headerOne);
            homeRepository.save(homeData);
            return ResponseEntity.ok(new Response(StatusType.OK, "HeaderOne updated successfully", homeData.getHeaderOne()));

        } catch (Exception e) {
            e.printStackTrace();
            System.err.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }

    public ResponseEntity<Response> updateDescriptionOne(Principal principal, String descriptionOne) {
        try {
            Users user = getAuthenticatedUser(principal);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new Response(StatusType.UNAUTHORIZED, "Unauthorized", null));
            }

            Home homeData = homeRepository.findByUsers(user);
            if (homeData == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new Response(StatusType.NOT_FOUND, "Home data not found", null));
            }

            homeData.setDescriptionOne(descriptionOne);
            homeRepository.save(homeData);
            return ResponseEntity.ok(new Response(StatusType.OK, "DescriptionOne updated successfully", homeData.getDescriptionOne()));

        } catch (Exception e) {
            e.printStackTrace();
            System.err.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }
}
