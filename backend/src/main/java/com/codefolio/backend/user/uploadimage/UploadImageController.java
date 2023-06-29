package com.codefolio.backend.user.uploadimage;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;

@RestController
public class UploadImageController {

    private final UploadImageService uploadImageService;

    public UploadImageController(UploadImageService uploadImageService) {
        this.uploadImageService = uploadImageService;
    }

    @PostMapping("/profile-image-upload")
    public ResponseEntity<?> uploadProfileImage(@RequestParam("file") MultipartFile file, Principal principal) {
        return uploadImageService.uploadProfileImage(file, principal);
    }

    @PostMapping("/about-icon-one-upload")
    public ResponseEntity<?> uploadIconOneAbout(@RequestParam("file") MultipartFile file, Principal principal) {
        return uploadImageService.uploadIconOneAbout(file, principal);
    }
    @PostMapping("/about-icon-two-upload")
    public ResponseEntity<?> uploadIconTwoAbout(@RequestParam("file") MultipartFile file, Principal principal) {
        return uploadImageService.uploadIconTwoAbout(file, principal);
    }
    @PostMapping("/about-icon-three-upload")
    public ResponseEntity<?> uploadIconThreeAbout(@RequestParam("file") MultipartFile file, Principal principal) {
        return uploadImageService.uploadIconThreeAbout(file, principal);
    }
    @PostMapping("/about-image-one-upload")
    public ResponseEntity<?> uploadImageOneAbout(@RequestParam("file") MultipartFile file, Principal principal) {
        return uploadImageService.uploadImageOneAbout(file, principal);
    }
}
