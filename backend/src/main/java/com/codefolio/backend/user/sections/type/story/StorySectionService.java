package com.codefolio.backend.user.sections.type.story;

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
public class StorySectionService {

    private final StorySectionRepository storySectionRepository;

    public ResponseEntity<Response> updateHeaderOne(Principal principal, String headerOne) {
        try {
            Users user = getAuthenticatedUser(principal);
            Optional<StorySection> optionalStoryData = storySectionRepository.findByUsers(user);

            if (optionalStoryData.isPresent()) {
                StorySection storyData = optionalStoryData.get();
                storyData.setHeaderOne(headerOne);
                storySectionRepository.save(storyData);
                return ResponseEntity.ok(new Response(StatusType.OK, "Header one updated successfully", storyData.getHeaderOne()));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response(StatusType.NOT_FOUND, "Story data not found", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }

    public ResponseEntity<Response> updateDescriptionOne(Principal principal, String descriptionOne) {
        try {
            Users user = getAuthenticatedUser(principal);
            Optional<StorySection> optionalStoryData = storySectionRepository.findByUsers(user);
            if (optionalStoryData.isPresent()) {
                StorySection storyData = optionalStoryData.get();
                storyData.setHeaderOne(descriptionOne);
                storySectionRepository.save(storyData);
                return ResponseEntity.ok(new Response(StatusType.OK, "Description one updated successfully", storyData.getHeaderOne()));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response(StatusType.NOT_FOUND, "Story data not found", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }

    public ResponseEntity<Response> updateBulletOne(Principal principal, String bulletOne) {
        try {
            Users user = getAuthenticatedUser(principal);
            Optional<StorySection> optionalStoryData = storySectionRepository.findByUsers(user);
            if (optionalStoryData.isPresent()) {
                StorySection storyData = optionalStoryData.get();
                storyData.setBulletOne(bulletOne);
                storySectionRepository.save(storyData);
                return ResponseEntity.ok(new Response(StatusType.OK, "Bullet one updated successfully", storyData.getBulletOne()));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response(StatusType.NOT_FOUND, "Story data not found", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }

    public ResponseEntity<Response> updateBulletTwo(Principal principal, String bulletTwo) {
        try {
            Users user = getAuthenticatedUser(principal);
            Optional<StorySection> optionalStoryData = storySectionRepository.findByUsers(user);
            if (optionalStoryData.isPresent()) {
                StorySection storyData = optionalStoryData.get();
                storyData.setBulletTwo(bulletTwo);
                storySectionRepository.save(storyData);
                return ResponseEntity.ok(new Response(StatusType.OK, "Bullet two updated successfully", storyData.getBulletTwo()));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response(StatusType.NOT_FOUND, "Story data not found", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }

    public ResponseEntity<Response> updateBulletThree(Principal principal, String bulletThree) {
        try {
            Users user = getAuthenticatedUser(principal);
            Optional<StorySection> optionalStoryData = storySectionRepository.findByUsers(user);
            if (optionalStoryData.isPresent()) {
                StorySection storyData = optionalStoryData.get();
                storyData.setBulletThree(bulletThree);
                storySectionRepository.save(storyData);
                return ResponseEntity.ok(new Response(StatusType.OK, "Bullet three updated successfully", storyData.getBulletThree()));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response(StatusType.NOT_FOUND, "Story data not found", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }

}
