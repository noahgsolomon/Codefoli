package com.codefolio.backend.user.sections.type.story;

import com.codefolio.backend.user.Users;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Optional;

import static com.codefolio.backend.user.UserService.getAuthenticatedUser;

@Service
@AllArgsConstructor
public class StorySectionService {

    private final StorySectionRepository storySectionRepository;

    public ResponseEntity<?> updateHeaderOne(Principal principal, String headerOne) {
        Users user = getAuthenticatedUser(principal);
        Optional<StorySection> optionalStoryData = storySectionRepository.findByUsers(user);

        if (optionalStoryData.isPresent()) {
            StorySection storyData = optionalStoryData.get();
            storyData.setHeaderOne(headerOne);
            storySectionRepository.save(storyData);
            return ResponseEntity.ok(storyData.getHeaderOne());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<?> updateDescriptionOne(Principal principal, String descriptionOne) {
        Users user = getAuthenticatedUser(principal);
        Optional<StorySection> optionalStoryData = storySectionRepository.findByUsers(user);
        if (optionalStoryData.isPresent()) {
            StorySection storyData = optionalStoryData.get();
            storyData.setHeaderOne(descriptionOne);
            storySectionRepository.save(storyData);
            return ResponseEntity.ok(storyData.getHeaderOne());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<?> updateBulletOne(Principal principal, String bulletOne) {
        Users user = getAuthenticatedUser(principal);
        Optional<StorySection> optionalStoryData = storySectionRepository.findByUsers(user);
        if (optionalStoryData.isPresent()) {
            StorySection storyData = optionalStoryData.get();
            storyData.setBulletOne(bulletOne);
            storySectionRepository.save(storyData);
            return ResponseEntity.ok(storyData.getBulletOne());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<?> updateBulletTwo(Principal principal, String bulletTwo) {
        Users user = getAuthenticatedUser(principal);
        Optional<StorySection> optionalStoryData = storySectionRepository.findByUsers(user);
        if (optionalStoryData.isPresent()) {
            StorySection storyData = optionalStoryData.get();
            storyData.setBulletTwo(bulletTwo);
            storySectionRepository.save(storyData);
            return ResponseEntity.ok(storyData.getBulletTwo());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<?> updateBulletThree(Principal principal, String bulletThree) {
        Users user = getAuthenticatedUser(principal);
        Optional<StorySection> optionalStoryData = storySectionRepository.findByUsers(user);
        if (optionalStoryData.isPresent()) {
            StorySection storyData = optionalStoryData.get();
            storyData.setBulletThree(bulletThree);
            storySectionRepository.save(storyData);
            return ResponseEntity.ok(storyData.getBulletThree());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
