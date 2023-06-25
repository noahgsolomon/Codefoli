package com.codefolio.backend.user.uploadimage;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.codefolio.backend.user.Users;
import com.codefolio.backend.user.pages.homepage.Home;
import com.codefolio.backend.user.pages.homepage.HomeRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.UUID;

import static com.codefolio.backend.user.UserService.getAuthenticatedUser;

@Service
@AllArgsConstructor
public class UploadImageService {

    private final AmazonS3 s3Client;
    private final HomeRepository homeRepository;

    public ResponseEntity<?> uploadFile(MultipartFile file, Principal principal) {
        System.out.println("uploadFile");
        String bucketName = "codefolioimagebucket";
        String key = UUID.randomUUID().toString();
        System.out.println(file);
        System.out.println(file.getContentType());
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
        ImageResponse imageResponse = new ImageResponse(s3Client.getUrl(bucketName, key).toString());
        System.out.println(imageResponse.url());
        Users user = getAuthenticatedUser(principal);
        Home home = homeRepository.findByUsers(user);
        home.setProfileImage(imageResponse.url());
        homeRepository.save(home);

        return ResponseEntity.ok(imageResponse);
    }

}
