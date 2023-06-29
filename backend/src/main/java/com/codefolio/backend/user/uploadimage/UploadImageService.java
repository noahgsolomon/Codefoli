package com.codefolio.backend.user.uploadimage;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.codefolio.backend.user.Users;
import com.codefolio.backend.user.pages.aboutpage.About;
import com.codefolio.backend.user.pages.aboutpage.AboutRepository;
import com.codefolio.backend.user.pages.homepage.Home;
import com.codefolio.backend.user.pages.homepage.HomeRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;

import static com.codefolio.backend.user.UserService.getAuthenticatedUser;

@Service
@AllArgsConstructor
public class UploadImageService {

    private final AmazonS3 s3Client;
    private final HomeRepository homeRepository;
    private final AboutRepository aboutRepository;

    public ResponseEntity<?> uploadProfileImage(MultipartFile file, Principal principal) {
        Users user = getAuthenticatedUser(principal);
        ImageResponse imageResponse = uploadImage(file, user.getId() + "-profile-image", "codefolioimagebucket");
        Home home = homeRepository.findByUsers(user);
        home.setProfileImage(imageResponse.url());
        homeRepository.save(home);
        return ResponseEntity.ok(imageResponse);
    }

    public ResponseEntity<?> uploadIconOneAbout(MultipartFile file, Principal principal) {
        Users user = getAuthenticatedUser(principal);
        ImageResponse imageResponse = uploadImage(file, user.getId() + "-about-icon-one", "codefolioimagebucket");
        About about = aboutRepository.findByUsers(user);
        about.setIconOne(imageResponse.url());
        aboutRepository.save(about);
        return ResponseEntity.ok(imageResponse);
    }

    public ResponseEntity<?> uploadIconTwoAbout(MultipartFile file, Principal principal) {
        Users user = getAuthenticatedUser(principal);
        ImageResponse imageResponse = uploadImage(file, user.getId() + "-about-icon-two", "codefolioimagebucket");
        About about = aboutRepository.findByUsers(user);
        about.setIconTwo(imageResponse.url());
        aboutRepository.save(about);
        return ResponseEntity.ok(imageResponse);
    }

    public ResponseEntity<?> uploadIconThreeAbout(MultipartFile file, Principal principal) {
        Users user = getAuthenticatedUser(principal);
        ImageResponse imageResponse = uploadImage(file, user.getId() + "-about-icon-three", "codefolioimagebucket");
        About about = aboutRepository.findByUsers(user);
        about.setIconThree(imageResponse.url());
        aboutRepository.save(about);
        return ResponseEntity.ok(imageResponse);
    }

    public ResponseEntity<?> uploadImageOneAbout(MultipartFile file, Principal principal) {
        Users user = getAuthenticatedUser(principal);
        ImageResponse imageResponse = uploadImage(file, user.getId() + "-about-image-one", "codefolioimagebucket");
        About about = aboutRepository.findByUsers(user);
        about.setImageOne(imageResponse.url());
        aboutRepository.save(about);
        return ResponseEntity.ok(imageResponse);
    }

    public ImageResponse uploadImage(MultipartFile file, String key, String bucketName){
        String contentType = file.getContentType();
        if (!"image/jpeg".equals(contentType) && !"image/png".equals(contentType)) {
            throw new IllegalArgumentException("Invalid file type. Only PNG and JPG images are accepted.");
        }
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(contentType);
        metadata.setContentLength(file.getSize());

        try {
            s3Client.putObject(new PutObjectRequest(bucketName, key, file.getInputStream(), metadata));
        } catch (IOException e) {
            throw new RuntimeException("Error uploading file", e);
        }
        return new ImageResponse(s3Client.getUrl(bucketName, key).toString());
    }

}
