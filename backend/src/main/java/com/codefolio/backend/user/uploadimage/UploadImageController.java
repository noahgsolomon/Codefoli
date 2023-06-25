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
    public ResponseEntity<?> handleFileUpload(@RequestParam("file") MultipartFile file, Principal principal) {
        return uploadImageService.uploadFile(file, principal);
    }
}
