package com.codefolio.backend.user.uploadimage;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.codefolio.backend.user.Users;
import com.codefolio.backend.user.pages.aboutpage.About;
import com.codefolio.backend.user.pages.aboutpage.AboutRepository;
import com.codefolio.backend.user.pages.homepage.Home;
import com.codefolio.backend.user.pages.homepage.HomeRepository;
import com.codefolio.backend.user.sections.type.story.StorySection;
import com.codefolio.backend.user.sections.type.story.StorySectionRepository;
import com.codefolio.backend.user.workhistory.Work;
import com.codefolio.backend.user.workhistory.WorkRepository;
import com.codefolio.backend.util.Response;
import com.codefolio.backend.util.StatusType;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.Optional;

import static com.codefolio.backend.user.UserService.getAuthenticatedUser;

@Service
@AllArgsConstructor
public class UploadImageService {

    private final AmazonS3 s3Client;
    private final HomeRepository homeRepository;
    private final AboutRepository aboutRepository;
    private final StorySectionRepository storySectionRepository;
    private final WorkRepository workRepository;

    public ResponseEntity<Response> uploadProfileImage(MultipartFile file, Principal principal) {
        try {
            Users user = getAuthenticatedUser(principal);
            ImageResponse imageResponse = uploadImage(file, user.getId() + "-profile-image", "codefolioimagebucket");
            Home home = homeRepository.findByUsers(user);
            home.setProfileImage(imageResponse.url());
            homeRepository.save(home);
            return ResponseEntity.ok(new Response(StatusType.OK, "Profile image uploaded successfully", imageResponse));
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }

    public ResponseEntity<Response> uploadIconOneAbout(MultipartFile file, Principal principal) {
        try {
            Users user = getAuthenticatedUser(principal);
            ImageResponse imageResponse = uploadImage(file, user.getId() + "-about-icon-one", "codefolioimagebucket");
            About about = aboutRepository.findByUsers(user);
            about.setIconOne(imageResponse.url());
            aboutRepository.save(about);
            return ResponseEntity.ok(new Response(StatusType.OK, "Icon one uploaded successfully", imageResponse));
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }

    public ResponseEntity<Response> uploadIconTwoAbout(MultipartFile file, Principal principal) {
        try {
            Users user = getAuthenticatedUser(principal);
            ImageResponse imageResponse = uploadImage(file, user.getId() + "-about-icon-two", "codefolioimagebucket");
            About about = aboutRepository.findByUsers(user);
            about.setIconTwo(imageResponse.url());
            aboutRepository.save(about);
            return ResponseEntity.ok(new Response(StatusType.OK, "Icon two uploaded successfully", imageResponse));
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }

    public ResponseEntity<Response> uploadIconThreeAbout(MultipartFile file, Principal principal) {
        try {
            Users user = getAuthenticatedUser(principal);
            ImageResponse imageResponse = uploadImage(file, user.getId() + "-about-icon-three", "codefolioimagebucket");
            About about = aboutRepository.findByUsers(user);
            about.setIconThree(imageResponse.url());
            aboutRepository.save(about);
            return ResponseEntity.ok(new Response(StatusType.OK, "Icon three uploaded successfully", imageResponse));
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }

    public ResponseEntity<Response> uploadImageOneAbout(MultipartFile file, Principal principal) {
        try {
            Users user = getAuthenticatedUser(principal);
            ImageResponse imageResponse = uploadImage(file, user.getId() + "-about-image-one", "codefolioimagebucket");
            Optional<StorySection> optionalStorySection = storySectionRepository.findByUsers(user);
            if (optionalStorySection.isPresent()) {
                StorySection storySection = optionalStorySection.get();
                storySection.setImageOne(imageResponse.url());
                storySectionRepository.save(storySection);
                return ResponseEntity.ok(new Response(StatusType.OK, "Image one uploaded successfully", imageResponse));
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Response(StatusType.BAD, "StorySection not found for the given user", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }

    public ImageResponse uploadImage(MultipartFile file, String key, String bucketName) throws RuntimeException {
        try {
            String contentType = file.getContentType();
            if (!"image/jpeg".equals(contentType) && !"image/png".equals(contentType)) {
                throw new IllegalArgumentException("Invalid file type. Only PNG and JPG images are accepted.");
            }
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(contentType);
            metadata.setContentLength(file.getSize());

            s3Client.putObject(new PutObjectRequest(bucketName, key, file.getInputStream(), metadata));
            return new ImageResponse(s3Client.getUrl(bucketName, key).toString());
        } catch (IOException e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            throw new RuntimeException("Error uploading file", e);
        }
    }

    public ResponseEntity<Response> uploadJobImage(MultipartFile file, Principal principal, long id) {
        try {
            Users user = getAuthenticatedUser(principal);
            ImageResponse imageResponse = uploadImage(file, user.getId() + "-job-" + id, "codefolioimagebucket");
            Optional<Work> optionalJob = workRepository.findByUsersAndId(user, id);
            if (optionalJob.isPresent()) {
                Work job = optionalJob.get();
                job.setImage(imageResponse.url());
                workRepository.save(job);
                return ResponseEntity.ok(new Response(StatusType.OK, "Image uploaded successfully", imageResponse));
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Response(StatusType.BAD, "Job not found", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(StatusType.ERROR, "Internal server error", null));
        }
    }
}
